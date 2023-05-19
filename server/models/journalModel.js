import {Schema, model} from 'mongoose'

const JournalSchema = new Schema({
    children:[
        {
            child: {
                type     :      Schema.Types.ObjectId,
                ref      :      "Children",
                required: true,
            },
            rating:{
                type: Number,
                default: 0,
            },
            visit:{
                type: Boolean,
                required: true,
                default: false,
            }
        }
    ]
})

export default model('Journal', JournalSchema)