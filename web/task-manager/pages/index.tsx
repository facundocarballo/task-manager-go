import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { HStack, VStack } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="App to handle all of your tasks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack w="full">
        <HStack w="full">

        </HStack>
      </VStack>
    </>
  )
}
