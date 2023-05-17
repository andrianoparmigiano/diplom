import {Schema, model} from 'mongoose'

const ChatRoomSchema = new Schema({
    user_id:{
        type     :      Schema.Types.ObjectId,
        ref      :      "User",
        required :      true,
    },
    child_id:{
        type: Schema.Types.ObjectId,
        ref      :      "Children",
        required :      true,
    },
    lesson_id:{
        type: Schema.Types.ObjectId,
        ref      :      "Lesson",
        required :      true,
    },
    // messages:[{
    //     type: Schema.Types.ObjectId,
    //     ref      :      "Messages",
    //     required: true,
    //     default: [],
    // }],
})


export default model('ChatRoom', ChatRoomSchema)