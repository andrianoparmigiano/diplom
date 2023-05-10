import {Schema, model} from 'mongoose'

const LessonSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique   :      true,
    },
})

export default model('Lesson', LessonSchema)