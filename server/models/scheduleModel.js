import {Schema, model} from 'mongoose'

const ScheduleSchema = new Schema({
    date:{
        type: String,
        unique   :      true,
        required: true,
    },
    info_lessons:[{
        type     :      Schema.Types.ObjectId,
        ref      :      "InfoLesson"
    }],
})

export default model('Schedule', ScheduleSchema)