import styles from '@/styles/Home.module.css';
import { useState, useEffect, useRef } from 'react';

// TODO: when timer hits 0, change 'start' to 'reset'

// make this: https://www.vox.com/21523212/crossword-puzzles-free-daily-printable

export default function Timer() {
  const baseTimers = {
    work: 1500000,
    break: 5000,
    walk: 600000,
  };

  const endTimeRef = useRef(null);

  const [mode, setMode] = useState('work');
  const [remainingTime, setRemainingTime] = useState(baseTimers[mode]);
  const [isRunning, setIsRunning] = useState(false);
  const [ding, setDing] = useState();

  const handleToggle = (newMode) => {
    if (mode === newMode) return;

    setMode(newMode);
    setIsRunning(false);
    setRemainingTime(baseTimers[newMode]);
  };

  const startTimer = () => {
    if (isRunning) {
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setRemainingTime(baseTimers[mode]);
  };

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor(remainingTime / 1000) % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    endTimeRef.current = Date.now() + remainingTime;

    const interval = setInterval(() => {
      const now = Date.now();

      const remaining = Math.max(0, Math.floor(endTimeRef.current - now));

      setRemainingTime(remaining);

      if (remaining <= 0) {
        ding.play();
        setIsRunning(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setDing(new Audio('/audio/ding.mp3'));
  }, []);

  return (
    <>
      <div className={styles.timerBox}>
        <h1>Work Timer</h1>
        <div className={styles.toggleBlock}>
          <button
            className={mode === 'work' ? styles.toggled : ''}
            onClick={() => handleToggle('work')}
          >
            Work
          </button>
          <button
            className={mode === 'break' ? styles.toggled : ''}
            onClick={() => handleToggle('break')}
          >
            Break
          </button>
          <button
            className={mode === 'walk' ? styles.toggled : ''}
            onClick={() => handleToggle('walk')}
          >
            Walk
          </button>
        </div>
        <div className={styles.clock}>
          <h1>{formatTime(remainingTime)}</h1>
        </div>
        <div className={styles.toggleBlock}>
          {isRunning && <button onClick={() => startTimer()}>Pause</button>}
          {!isRunning && remainingTime > 0 && (
            <button onClick={() => startTimer()}>Start</button>
          )}
          {!isRunning && remainingTime <= 0 && (
            <button onClick={() => resetTimer()}>Reset</button>
          )}
        </div>
      </div>
    </>
  );
}
