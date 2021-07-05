import mongoose, {Schema} from "mongoose";
import {rDate, rNumber, rString, uBool, uString} from "@utils/fields";

const apartmentSchema = new Schema({
    name: rString,
    description: uString,
    image: uString,
    type: rString,
    price: rNumber,
    number_room: rNumber,
    booked: uBool,
    date: rDate
}, {
    timestamps: true
})

const Apartment = (mongoose.models && mongoose.models.apartments)
    ? mongoose.models.apartments
    : mongoose.model('apartments', apartmentSchema)

export default Apartment
