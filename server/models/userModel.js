import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    fullName: {
        type     :      String,
        required :      true,
    },
    email: {
        type     :      String,
        required :      true,
        unique   :      true,
    },
    password: {
        type     :      String,
        required :      true,
    },
    role: {
        type     :      String,
        required :      true,
        default  :      "user",
    },
    children:[{
        type     :      Schema.Types.ObjectId,
        ref      :      "Children"
    }]
    // isActivated: {
    //     type    :      Boolean,
    //     default :      false,
    // },
    // activationLink :      { type: String },
});

export default model("User", UserSchema);
