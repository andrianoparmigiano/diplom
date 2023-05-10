import {Schema, model} from 'mongoose'

const ScheduleSchema = new Schema({
    week:{
        type: String,
        unique   :      true,
        required: true,
        default: `${dayjs().year()}-${dayjs().week()}`,
    },
    "ПН":{
           
    },
})

export default model('Schedule', ScheduleSchema)