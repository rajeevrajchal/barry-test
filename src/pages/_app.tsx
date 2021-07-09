import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/react"
import {ApolloProvider} from "@apollo/client";
import client from "@lib/apolloClient";
import { IncomingMessage, ServerResponse } from 'http';
import Cookies from 'cookies';

function MyApp({Component, pageProps}: AppProps) {
    return <ApolloProvider client ={client(pageProps.accessToken)}><ChakraProvider><Component {...pageProps} /> </ChakraProvider></ApolloProvider>
    // return <ChakraProvider><Component {...pageProps} /> </ChakraProvider>
}
export async function getServerSideProps(context: { req: IncomingMessage; res: ServerResponse; }) {

    const secure: boolean = process.env.NODE_ENV === 'production';
    const myCookies = new Cookies(context.req, context.res, { secure });
    const accessToken = myCookies.get('BarryTestAccessToken');
    return {
        props: {
            accessToken: accessToken
        }
    }
}
export default MyApp
