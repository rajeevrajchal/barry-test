import mongoose, {Schema} from "mongoose";
import {reference, rString} from "@utils/fields";

const orderSchema = new Schema({
    type: rString,
    user: reference("users"),
    apartment: reference("apartments")
}, {
    timestamps: true
})

const Order = (mongoose.models && mongoose.models.orders)
    ? mongoose.models.orders
    : mongoose.model('orders', orderSchema)

export default Order
