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

    async getchildren(req, res, next){
        try {
            const user = await userModel.find({})
            let children = []
            user.map(el => children.push(...el.children))
            res.json(children)
        } catch (err) {
            next(err);
        }
    }

    async setlessons(req, res, next){
        try {
            await lessonModel.deleteMany({})
            let lessons = []
            for(let lesson of req.body){
                let el = await lessonModel.create({name: lesson})
                lessons.push(el.name)
            }
            res.json(lessons)
        } catch (err) {
            next(err);
        }
    }

    async setchildsles(req, res, next){
        try {
            // const child = await childrenModel.findById(child_id)
            console.log(req.body);
            const user = await userModel.findById(req.body.user_id)
            const child_index = user.children.findIndex(el => el._id.toString() === req.body._id)
            user.children = [...user.children.slice(0, child_index), {...user.children[child_index], lessons: req.body.lessons}, ...user.children.slice(child_index + 1)]
            await user.save()
            const userDto = new UserDto(user)
            res.json(userDto)
        } catch (err) {
            next(err);
        }
    }

    async getlessons(req, res, next){
        try {
            const lessons = await lessonModel.find({});
            res.json(lessons.map(el=>el.name))
        } catch (err) {
            next(err);
        }
    }

    async checkauth(req, res, next){
        try {
            const { refreshToken } = req.cookies;
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const condidate = await userModel.findOne({email: userData.email});
            const userDto = new UserDto(condidate);
            res.json(userDto);
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController()