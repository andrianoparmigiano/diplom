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
    children:{
        type     :      [
            new Schema({
                name:{
                    type: String,
                    required: true,
                },
                lessons:{
                    type: [String],
                    default  :      [],
                }
            })
        ],
        default  :      []
    }
    // isActivated: {
    //     type    :      Boolean,
    //     default :      false,
    // },
    // activationLink :      { type: String },
});

export default model("User", UserSchema);
