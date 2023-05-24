import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import tokenService from "./tokenService.js"
import UserDto from "../dtos/userDto.js"
import ErrorInServer from "../exceptions/error.js"
import ChildrenModel from "../models/childrenModel.js"

class UserService{
    async registration(email, password, fullName, children){
        const condidate = await userModel.findOne({email})
        if(condidate){
            throw ErrorInServer.badRequest(`Пользователь с почтовым адресом ${email} уже существует!`)
        }
        const hashPassword   = await bcrypt.hash(password + email, 3)
        const user           = await userModel.create({email, password: hashPassword, fullName, children: []})
        const childs = []
        for(let el of children){
            const child = await ChildrenModel.create({...el, parent: user._id})
            childs.push(child._id)
        }
        user.children = childs
        await user.save()
        const fullUser = await userModel.findById(user._id).populate({path: "children", populate: {path: "lessons"}});
        const userDto = new UserDto({...fullUser._doc, children: fullUser.children.map(child => ({...child._doc, lessons: !child._doc.lessons ? [] : child._doc.lessons.map(les => les.name)}))})
        console.log(userDto);
        const refreshToken  = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, refreshToken)
        return { refreshToken, user: userDto }
    }

    async login(email, password){
        const condidate = await userModel.findOne({email}).populate({path: "children", populate: {path: "lessons"}});
        if(!condidate){
            throw ErrorInServer.badRequest(`Неверные почта или пароль!`)
        }
        console.log(condidate)
        const verification = await bcrypt.compare(password + email, condidate.password)
        if(!verification){
            throw ErrorInServer.badRequest(`Неверные почта или пароль!`)
        }
        const userDto = new UserDto({...condidate._doc, children: condidate.children.map(child => ({...child._doc, lessons: !child._doc.lessons ? [] : child._doc.lessons.map(les => les.name)}))})
        const refreshToken  = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, refreshToken)
        return { refreshToken, user: userDto }
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
}

export default new UserService()