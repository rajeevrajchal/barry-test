import {map, includes} from "lodash";
import moment from "moment";

import {$FIXME} from "@utils/constant";

import {dbConnect} from "@lib/backend/db";
import {createToken} from "@lib/backend/jwt";
import {checkPassword, hashPassword} from "@lib/backend/crypto";

import Apartment from "@models/apartment.model";
import User from "@models/user.model";
import Order from "@models/order.model";
import Slot from "@models/slot.model";

dbConnect()

export const resolvers = {
    Query: {

        //apartments
        getApartments: async (_parent: $FIXME, _args: $FIXME, _context: $FIXME) => {
            try {
                const apartments = await Apartment.find()
                if (apartments) {
                    return map(apartments, async({_id, name, description, image, type, price, number_room}) => {
                        const slots = await Slot.find({apartment: _id})
                        return {
                            id: _id,
                            name: name,
                            description: description,
                            image: image,
                            type: type,
                            price: price,
                            number_room: number_room,
                            slots: slots
                        }
                    })
                }
            } catch (e) {
                throw e
            }
        },
        getApartment: async (_: $FIXME, _args: $FIXME) => {
            try {
                const {id} = _args
                const apartment = await Apartment.findOne({_id: id})
                if (apartment) {
                    const slots = await Slot.find({apartment: id})
                    return {
                        id: apartment._id,
                        name: apartment.name,
                        description: apartment.description,
                        image: apartment.image,
                        type: apartment.type,
                        price: apartment.price,
                        number_room: apartment.number_room,
                        slots: slots
                    }
                }
            } catch (error) {
                throw error;
            }
        },

        // {slot: {$gte: moment(_args.minDate), $lt: moment(_args.maxDate)}},

        findApartments: async (_: $FIXME, _args: $FIXME) => {
            try {
                const apartments = await Apartment.find({
                    $or: [
                        {type: _args.type},
                        {name: {$regex: ".*" + _args.name + ".*"}},
                        {price: {$gte: _args.minPrice, $lt: _args.maxPrice}},
                        {number_room: {$gte: _args.minRoom, $lt: _args.maxRoom}},
                    ]
                })

                // const slots = await Slot.find({
                //     $or: [
                //         {date: {$gte: moment(_args.minDate), $lt: moment(_args.maxDate)}}
                //     ]
                // }).populate('apartment')
                // console.log('the slots', slots)

                if(apartments){
                    return map(apartments, async({_id, name, description, image, type, price, number_room}) => {
                        const slots = await Slot.find({apartment: _id})
                        return {
                            id: _id,
                            name: name,
                            description: description,
                            image: image,
                            type: type,
                            price: price,
                            number_room: number_room,
                            slots: slots
                        }
                    })
                }
            } catch (e) {
                throw e
            }
        },

        //order
        listAllOrders: async (_parent: $FIXME, _args: $FIXME, _context: $FIXME) => {
            try {
                const orders = await Order.find().populate('user').populate('apartment')
                if (orders) {
                    return map(orders, ({_id, user, apartment, type, createdAt, updatedAt}) => {
                        return {
                            id: _id,
                            user: user,
                            apartment: apartment,
                            type: type,
                            createdAt: createdAt,
                            updatedAt: updatedAt,
                        }
                    })
                }
            } catch (e) {
                throw e
            }
        },
        //user
        getUserInfo: async (_parent: $FIXME, _args: $FIXME, _context: $FIXME) => {
            try {
                const {status, user, message} = _context.token
                const {id} = _args
                if (!status) {
                    return new Error(message)
                }
                if (user._id !== id || includes(["seller", "admin"], user.role)) {
                    return new Error("No Permission")
                }
                const userInfo = await User.findOne({_id: id}).populate('createdOrder')
                const orders = await Order.find({user: id}).populate('apartment')
                if (userInfo) {
                    return {
                        id: userInfo._id,
                        first_name: userInfo.first_name,
                        last_name: userInfo.last_name,
                        email: userInfo.email,
                        role: userInfo.role,
                        orders: orders
                    }
                }
            } catch (e) {
                throw e
            }
        }
    },

    Mutation: {
        //apartments
        storeApartment: async (_parent: $FIXME, _args: $FIXME, _context: $FIXME) => {
            try {
                const {status, user, message} = _context.token
                if (!status) {
                    return new Error(message)
                }
                const isRoleMatch = includes(["admin", "seller"], user.role)
                if (isRoleMatch === false) {
                    return new Error("No Access, Only to admin")
                }
                const apartment = await Apartment.create(_args)
                await map(_args.slot, async (slot) => {
                    return await Slot.create({
                        date: slot,
                        booked: false,
                        apartment: apartment._id,
                    })
                })
                if (apartment) {
                    return {
                        id: apartment._id,
                        name: apartment.name,
                        description: apartment.description,
                        image: apartment.image,
                        type: apartment.type,
                        price: apartment.price,
                        number_rooms: apartment.number_rooms,
                    }
                }
            } catch (error) {
                return error;
            }
        },

        updateApartment: async (_: $FIXME, _args: $FIXME, _context: $FIXME) => {
            try {
                const {status, user, message} = _context.token
                if (!status) {
                    return new Error(message)
                }
                const isRoleMatch = includes(["admin", "seller"], user.role)
                if (isRoleMatch === false) {
                    return new Error("No Access, Only to admin")
                }
                const {id} = _args
                const apartment = await Apartment.findOneAndUpdate({_id: id}, _args)
                if (apartment) {
                    return {
                        id: apartment._id,
                        name: apartment.name,
                        description: apartment.description,
                        image: apartment.image,
                        type: apartment.type,
                        price: apartment.price,
                        number_rooms: apartment.number_rooms,
                        time_slots: apartment.time_slots
                    }
                }
            } catch (e) {
                throw e
            }
        },
        deleteApartment: async (_: $FIXME, _args: $FIXME, _context: $FIXME) => {
            try {
                const {status, user, message} = _context.token
                if (!status) {
                    return new Error(message)
                }
                if (user.role !== "seller") {
                    return new Error("No Access, Only to admin")
                }
                const {id} = _args
                const deletedApartment = await Apartment.findByIdAndDelete(id)
                if (!deletedApartment) {
                    return new Error("Please select valid apartment")
                }
                if (deletedApartment) {
                    return {
                        id: deletedApartment._id
                    }
                }
            } catch (e) {
                throw e
            }
        },

        //users
        registerUser: async (_parent: $FIXME, _args: $FIXME, _context: $FIXME) => {
            try {
                const {email, password} = _args
                const userExist = await User.findOne({email: email});
                if (userExist) {
                    return new Error("User Already Exist")
                }
                const encryptedPassword: string | unknown = await hashPassword(
                    password
                );
                const user = await User.create({
                    first_name: _args.first_name,
                    last_name: _args.last_name,
                    role: _args.role,
                    email: email,
                    password: encryptedPassword,
                });
                if (user) {
                    return {
                        id: user.id
                    }
                }
            } catch (e) {
                throw e
            }
        },
        loginUser: async (_parent: $FIXME, _args: $FIXME, _context: $FIXME) => {
            try {
                const {email, password} = _args
                const userExist: $FIXME = await User.findOne({email: email});
                if (!userExist) {
                    return new Error("Invalid User")
                }
                const isMatch: boolean | unknown = await checkPassword(password, userExist.password);
                if (!isMatch) {
                    return new Error("Invalid User")
                }
                const token = await createToken(userExist);
                return {
                    id: userExist._id,
                    email: userExist.email,
                    role: userExist.role,
                    first_name: userExist.first_name,
                    last_name: userExist.last_name,
                    token: token
                }
            } catch (e) {
                throw e
            }
        },

        //order
        createOrder: async (_parent: $FIXME, _args: $FIXME, _context: $FIXME) => {
            try {
                const order = await Order.create(_args)
                if (order) {
                    return order
                }
            } catch (e) {
                throw e
            }
        },
    }
}
