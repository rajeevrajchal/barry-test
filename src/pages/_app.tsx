import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/react"
import {ApolloProvider} from "@apollo/client";
import client from "@lib/apolloClient";

function MyApp({Component, pageProps}: AppProps) {
    return <ApolloProvider client ={client}><ChakraProvider><Component {...pageProps} /> </ChakraProvider></ApolloProvider>
}

export default MyApp
