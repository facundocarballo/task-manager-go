import Head from 'next/head';
import { Inter } from 'next/font/google';
import { NavBar } from '@/src/components/NavBar';
import { InputTask } from '@/src/subpages/InputTask';
import { TheDivider } from '@/src/components/TheDivider';

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
      <NavBar />
      <TheDivider />
      <InputTask />

    </>
  )
}
