import Head from 'next/head';
import { NavBar } from '@/src/components/NavBar';
import { InputTask } from '@/src/subpages/InputTask';
import { TheDivider } from '@/src/components/TheDivider';
import { Tasks } from '@/src/subpages/Tasks';
import { Categories } from '@/src/subpages/Categories';
import { Footer } from '@/src/subpages/Footer';
import { VStack, useColorModeValue } from '@chakra-ui/react';


export default function Home() {
  const bg = useColorModeValue('light.bg', 'dark.bg');
  return (
    <VStack minH='100%' bg={bg}>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="App to handle all of your tasks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <TheDivider horizontal={true} />
      <InputTask />
      <TheDivider horizontal={true} />
      <Tasks />
      <TheDivider horizontal={true} />
      <Categories />
      <TheDivider horizontal={true} />
      <Footer />
    </VStack>
  )
}
