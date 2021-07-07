import {ApolloServer} from "apollo-server-micro";
import Cors from "micro-cors";
import {typeDefs} from "@graphql/schema";
import {resolvers} from "@graphql/resolvers";
import {tokenVerification} from "@middleware/backend/tokenVerfication";
import {dbConnect} from "@lib/backend/db";

const cors = Cors({
    allowMethods: ["GET", "POST", "OPTIONS"]
});

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: {
        settings: {
            'editor.theme': 'light',
        }
    },
    context: async ({req}) => {
        await dbConnect()
        return {
            ...req,
            token: req && req.headers.authorization ? await tokenVerification(req) : ""
        }
    }
})

const handler = apolloServer.createHandler({
    path: '/api/graphql'
})

export const config = {
    api: {
        bodyParser: false
    }
}
export default cors(handler)
