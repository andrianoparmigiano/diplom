import {Schema, model} from 'mongoose'

const MessagesSchema = new Schema({
    user_id:{
        type     :      [Schema.Types.ObjectId],
        ref      :      "User",
        required :      true,
        unique   :      true,
    },
    childname:{
        type: String,
        required: true,
    },
    lessonname:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
        default: '',
    },
    time: { 
        type: Number,
        required: true,
        default: Date.now(),
    }
})


export default model('Messages', MessagesSchema)