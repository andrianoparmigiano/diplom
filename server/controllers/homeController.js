import UserDto from "../dtos/userDto.js";
import childrenModel from "../models/childrenModel.js";
import lessonModel from "../models/lessonModel.js";
import userModel from "../models/userModel.js";
import userService from "../services/userService.js";
import jwt from "jsonwebtoken";

class HomeController{
    async setlessons(req, res, next){
        try {
            await lessonModel.deleteMany({})
            let lessons = []
            for(let lesson of req.body){
                let el = await lessonModel.create({name: lesson})
                lessons.push(el.name)
            }
            let children = await childrenModel.find({})
            children = children.map((child) => ({...child, lessons: child.lessons.filter((les) => lessons.includes(les))}))
            res.json(lessons)
        } catch (err) {
            next(err);
        }
    }

    async setchildsles(req, res, next){
        try {
            const child = await childrenModel.findById(req.body._id)
            console.log(child);
            child.lessons = []
            for(let les of req.body.lessons){
                const les_id = await lessonModel.find({name: les}, "name")
                child.lessons.push(les_id[0]._id)
            }
            await child.save()
            console.log(req.body);
            await child.populate("lessons")
            res.json({...child._doc, lessons: child._doc.lessons.map(les => les.name)})
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
}

export default new HomeController()