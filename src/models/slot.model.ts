import mongoose, {Schema} from "mongoose";
import {dBool, rDate, reference, uBool} from "@utils/fields";

const slotSchema = new Schema({
    date: rDate,
    apartment: reference("apartments"),
    booked: dBool
}, {
    timestamps: true
})

const Slot = (mongoose.models && mongoose.models.slots)
    ? mongoose.models.slots
    : mongoose.model('slots', slotSchema)

export default Slot
