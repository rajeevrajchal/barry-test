import Head from 'next/head'
import { Box } from "@chakra-ui/react"

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <Box bg="tomato" w="100%" p={4} color="white">
              This is the Box
          </Box>
      </main>
    </>
  )
}