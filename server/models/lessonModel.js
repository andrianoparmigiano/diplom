import {Schema, model} from 'mongoose'

const LessonSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique   :      true,
    },
    // children: [{
    //     type     :      Schema.Types.ObjectId,
    //     ref      :      "Children",
    //     default  :   []
    // }]
})

export default model('Lesson', LessonSchema)