import Head from 'next/head';
import { NavBar } from '@/src/components/NavBar';
import { TheDivider } from '@/src/components/TheDivider';
import { Categories } from '@/src/subpages/Categories';
import { Footer } from '@/src/subpages/Footer';
import { Spacer, VStack, useColorModeValue } from '@chakra-ui/react';
import { TasksCompleted } from '@/src/subpages/TasksCompleted';


export default function Home() {
  return (
    <VStack minH='100%'>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="App to handle all of your tasks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <TheDivider horizontal={true} />
      <Categories />
      <TheDivider horizontal={true} />
      <TasksCompleted />
      <Spacer />
      <TheDivider horizontal={true} />
      <Footer />
    </VStack>
  )
}
