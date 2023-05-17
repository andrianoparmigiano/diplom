import {Schema, model} from 'mongoose'

const ChildrenSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    lessons:[{
        type     :      Schema.Types.ObjectId,
        default  :      [],
        ref: 'Lesson',
    }],
    parent:{
        type     :      Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})


export default model('Children', ChildrenSchema)