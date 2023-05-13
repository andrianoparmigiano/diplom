import {Schema, model} from 'mongoose'

const ChildrenSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    lessons:{
        type: [String],
        default  :      [],
        ref: 'Lesson',
    }
})


export default model('Children', ChildrenSchema)