import {Schema, model} from 'mongoose'

const ChildrenSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    lessons:{
        type: [Schema.Types.ObjectId],
        default  :      [],
        ref: 'Lesson',
    }
})


export default model('Children', ChildrenSchema)