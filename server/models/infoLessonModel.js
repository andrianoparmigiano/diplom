import {Schema, model} from 'mongoose'

const InfoLessonSchema = new Schema({
    date:{
        type: String,
        unique   :      true,
        required: true,
    },
    time:{
        type: Date,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    journal:{
        type     :      Schema.Types.ObjectId,
        ref      :      "Journal"
    }
})

export default model('InfoLesson', InfoLessonSchema)