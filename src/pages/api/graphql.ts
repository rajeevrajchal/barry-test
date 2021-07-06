import {ApolloServer} from "apollo-server-micro";
import {typeDefs} from "@graphql/schema";
import {resolvers} from "@graphql/resolvers";
import {tokenVerification} from "@middleware/backend/tokenVerfication";

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        return {
            ...req,
            token: req && req.headers.authorization ? await tokenVerification(req) : ""
        }
    }
})

const handler = apolloServer.createHandler({path: '/api/graphql'})
export const config = {
    api: {
        bodyParser: false
    }
}
export default handler;
