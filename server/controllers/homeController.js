import UserDto from "../dtos/userDto.js";
import childrenModel from "../models/childrenModel.js";
import infoLessonModel from "../models/infoLessonModel.js";
import journalModel from "../models/journalModel.js";
import lessonModel from "../models/lessonModel.js";
import scheduleModel from "../models/scheduleModel.js";
import userModel from "../models/userModel.js";
import userService from "../services/userService.js";
import jwt from "jsonwebtoken";

class HomeController {
    async setlessons(req, res, next) {
        try {
            await lessonModel.deleteMany({});
            const info = await infoLessonModel.find({ name: { $nin: req.body } })
            console.log(info);
            if(info.length !== 0){
                await scheduleModel.updateMany({}, {
                    $pull: {
                        info_lessons: { $in: info.map(i => i._id)}
                    }
                })
            }
            for(let i of info){
                await journalModel.deleteOne({_id: i.journal})
            }
            await infoLessonModel.deleteMany({ name: { $nin: req.body } })
            let lessons = [];
            for (let lesson of req.body) {
                let el = await lessonModel.create({ name: lesson });
                lessons.push(el.name);
            }
            let children = await childrenModel.find({});
            children = children.map((child) => ({
                ...child,
                lessons: child.lessons.filter((les) => lessons.includes(les)),
            }));
            res.json(lessons);
        } catch (err) {
            next(err);
        }
    }

    async setchildsles(req, res, next) {
        try {
            const child = await childrenModel.findById(req.body._id).populate("lessons", 'name -_id');
            console.log(1,child);
            const info = await infoLessonModel.find({})
            for(let i of info){
                console.log("nahoditsya li 1", req.body.lessons.includes(i.name));
                if(req.body.lessons.includes(i.name)){
                    const journal = await journalModel.findOne({_id: i.journal})
                    console.log("nahoditsya li 2", journal.children.findIndex(ch => ch.child === req.body._id) === -1);
                    if(journal.children.findIndex(ch => ch.child === req.body._id) === -1){
                        await journalModel.findOneAndUpdate({}, {
                            $push: {
                                children: { child: req.body._id, visit: false, rating: 0}
                            }
                        })
                    }
                    continue
                }
                await journalModel.updateMany({}, {
                    $pull: {
                        children: { child: req.body._id}
                    }
                })
            }
            child.lessons = [];
            for (let les of req.body.lessons) {
                const les_id = await lessonModel.find({ name: les }, "name");
                child.lessons.push(les_id[0]._id);
            }
            await child.save();
            await child.populate("lessons");
            console.log(2,child);
            res.json({
                ...child._doc,
                lessons: child._doc.lessons.map((les) => les.name),
            });
        } catch (err) {
            next(err);
        }
    }

    async getlessons(req, res, next) {
        try {
            const lessons = await lessonModel.find({});
            res.json(lessons.map((el) => el.name));
        } catch (err) {
            next(err);
        }
    }
}

export default new HomeController();
