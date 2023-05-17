import UserDto from "../dtos/userDto.js";
import chatroomModel from "../models/chatroomModel.js";
import childrenModel from "../models/childrenModel.js";
import lessonModel from "../models/lessonModel.js";
import userModel from "../models/userModel.js";
import userService from "../services/userService.js";
import jwt from "jsonwebtoken";

class ChatController{
    async getmessages(req, res, next){
        try {
            const {user_id, child_id, lesson} = req.body
            const lesson_id = await lessonModel.findOne({name: lesson})
            const room = await chatroomModel.findOne({user_id, child_id, lesson_id: lesson_id._id}).populate('messages')
            if(room) {
                res.json(room)
                return
            }
            const new_room = await chatroomModel.create({user_id, child_id, lesson_id: lesson_id._id})
            res.json(new_room)
            return
        } catch (err) {
            next(err);
        }
    }
}

export default new ChatController()