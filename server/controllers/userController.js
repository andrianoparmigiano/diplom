import UserDto from "../dtos/userDto.js";
import childrenModel from "../models/childrenModel.js";
import lessonModel from "../models/lessonModel.js";
import userModel from "../models/userModel.js";
import userService from "../services/userService.js";
import jwt from "jsonwebtoken";

class AuthController{
    async registration(req, res, next){
        try {
            const {email, password, fullName, children} = req.body
            const userData = await userService.registration(email, password, fullName, children)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000})
            return res.json(userData)
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000})
            return res.json(userData)
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(token);
        } catch (err) {
            next(err);
        }
    }

    async getusers(req, res, next){
        try {
            let users = await userModel.find({role: "user"}).populate({path: "children", populate: {path: "lessons"}});
            users = users.map((user) => new UserDto({...user._doc, children: user.children.map(child => ({...child._doc, lessons: !child._doc.lessons ? [] : child._doc.lessons.map(les => les.name)}))}))
            res.json(users)
        } catch (err) {
            next(err);
        }
    }

    async getmessages(req, res, next){
        try {
            let users = await userModel.find({role: "user"}).populate("children")
            users = users.map((user) => new UserDto(user))
            res.json(users)
        } catch (err) {
            next(err);
        }
    }

    async checkauth(req, res, next){
        try {
            const { refreshToken } = req.cookies;
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const condidate = await userModel.findOne({email: userData.email}).populate({path: "children", populate: {path: "lessons"}});
            console.log({...condidate._doc})
            const userDto = new UserDto({...condidate._doc, children: condidate.children.map(child => ({...child._doc, lessons: !child._doc.lessons ? [] : child._doc.lessons.map(les => les.name)}))});
            res.json(userDto);
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController()