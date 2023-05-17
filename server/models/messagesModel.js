import {Schema, model} from 'mongoose'

const MessagesSchema = new Schema({
    // room_id:{
    //     type     :      Schema.Types.ObjectId,
    //     ref      :      "ChatRoom",
    //     required :      true,
    // },
    // user_id:{
    //     type     :      Schema.Types.ObjectId,
    //     ref      :      "User",
    //     required :      true,
    // },
    room: {
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    time: { 
        type: Date,
        required: true,
        default: new Date(),
    }
},{
    timestamps: true
})


export default model('Messages', MessagesSchema)