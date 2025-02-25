import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import ViewToggle from '@/components/ViewToggle';
import Timer from '@/components/Timer';
import Calendar from '@/components/Calendar/Calendar';
import { dayNames } from '@/constants/index';
import { useState } from 'react';

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
  const [times, setTimes] = useState(() =>
    Object.fromEntries(dayNames.map((name) => [name, []]))
  );

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
        <div className={styles.viewContainer}>
          {viewMode === 'timer' && <Timer setTime={setTimes} />}
          {viewMode === 'calendar' && <Calendar times={times} />}
        </div>
        {/* <Messages currentChannel={{ id: 0 }} /> */}
        {/* <ToDoList /> */}
      </div>
    </>
  );
}
