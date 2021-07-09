import {ApolloServer} from "apollo-server-micro";
import Cors from "micro-cors";
import {typeDefs} from "@graphql/schema";
import {resolvers} from "@graphql/resolvers";
import {tokenVerification} from "@middleware/backend/tokenVerfication";

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
    context: async (ctx) => {
        return {
            ...ctx,
            token: ctx.req && ctx.req.headers.authorization ? await tokenVerification(ctx.req) : ""
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
