import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';

// TODO: when timer hits 0, change 'start' to 'reset'

// make this: https://www.vox.com/21523212/crossword-puzzles-free-daily-printable

export default function TimerBox() {
  const baseTimers = {
    work: 1500,
    break: 5,
    walk: 600,
  };

  const [mode, setMode] = useState('work');
  const [time, setTime] = useState(baseTimers[mode]);
  const [isRunning, setIsRunning] = useState(false);
  const [ding, setDing] = useState();

  const handleToggle = (newMode) => {
    if (mode === newMode) return;

    setMode(newMode);
    setIsRunning(false);
    setTime(baseTimers[newMode]);
  };

  const startTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(baseTimers[mode]);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          ding.play();
          setIsRunning(false);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

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
          <h1>{formatTime(time)}</h1>
        </div>
        <div className={styles.toggleBlock}>
          {isRunning && <button onClick={() => startTimer()}>Pause</button>}
          {!isRunning && time > 0 && (
            <button onClick={() => startTimer()}>Start</button>
          )}
          {!isRunning && time <= 0 && (
            <button onClick={() => resetTimer()}>Reset</button>
          )}
        </div>
      </div>
    </>
  );
}
