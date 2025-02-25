import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import TimerBox from '@/components/TimerBox';
import ViewToggle from '@/components/ViewToggle';
import { useState } from 'react';
import Messages from '@/components/Messages/Messages';
import ToDoList from '@/components/ToDoList';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  const [viewMode, setViewMode] = useState('timer');

  return (
    <>
      <Head>
        <title>Turner Tracker</title>
        <meta
          name="description"
          content="App for time tracking with pomodoro"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer}>
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        <TimerBox />
        {/* <Messages currentChannel={{ id: 0 }} /> */}
        {/* <ToDoList /> */}
      </div>
    </>
  );
}
