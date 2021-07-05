import mongoose, {Schema} from "mongoose";
import {reference, rNumber, rString, uString} from "@utils/fields";

const userSchema = new Schema({
    first_name: rString,
    last_name: rString,
    email: rString,
    role: rString,
    password: rString,
    createdOrders: reference("orders")
}, {
    timestamps: true
})

const User = (mongoose.models && mongoose.models.users)
    ? mongoose.models.users
    : mongoose.model('users', userSchema)

export default User
