
class EditScheduleController{
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

export default new EditScheduleController()