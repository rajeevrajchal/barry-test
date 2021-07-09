import {gql} from "apollo-server-micro";

export const typeDefs = gql`
    type Apartments {
        id: ID!
        name: String!
        description: String
        image: String
        type: String!
        price: Int!
        number_room: Int!
        slots: [Slot]!
        seller:User
    }
    type Slot {
        id: ID!
        date: String!
        booked: Boolean!
    }
    type User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        role: String!
        orders: [Order]
        token: String
        createdAt: String
        updatedAt: String
    }
    type Order {
        id: ID!
        slot: Slot!
        user: User!
        apartment: Apartments!
        type: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        #for apartments
        getApartments: [Apartments]
        getApartment(name: String!): Apartments!
        getApartmentsByUser(userID: String!): [Apartments]
        findApartments(
            name: String
            type: String
            minPrice: Int
            maxPrice: Int
            minRoom: Int
            maxRoom: Int
            minDate: String
            maxDate: String
        ): [Apartments]
        #for orders
        listAllOrders: [Order]
        getUserInfo(id: String!): User!
    }

    type Mutation {
        #for apartments
        deleteApartment(id: String!): Apartments!
        storeApartment(
            name: String!,
            description: String,
            image: String,
            type: String,
            price: Int!,
            number_room: Int!,
            slot: [String]!
        ): Apartments
        updateApartment(
            id: ID!,
            name: String!,
            description: String,
            image: String,
            type: String,
            price: Int!,
            number_room: Int!,
        ): Apartments

        #for users
        registerUser(
            first_name: String!
            last_name: String!
            email: String!
            role: String!
            password: String!
        ): User
        loginUser(
            email: String!
            password: String!
        ) : User
        #for order
        createOrder(
            user: String!,
            apartment: String!,
            slot: String!,
            type: String,
        ): Order
    }
`
