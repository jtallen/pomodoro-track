import { useState } from 'react';
import styles from '@/styles/Home.module.css';

export default function ViewToggle({ viewMode, setViewMode }) {
  const toggleView = () => {
    console.log(viewMode);
    setViewMode(viewMode === 'timer' ? 'calendar' : 'timer');
  };

  return (
    <>
      <div className={styles.viewToggleBox}>
        <div className={styles.viewToggleLabel}>
          <h2>Timer</h2>
        </div>
        <div className={styles.viewToggle} onClick={toggleView}>
          <div
            className={`${styles.viewToggleThumb} ${
              viewMode === 'calendar' ? styles.toggled : ''
            }`}
          ></div>
        </div>
        <div className={styles.viewToggleLabel}>
          <h2>Calendar</h2>
        </div>
      </div>
      {/* <div className={styles.viewToggleBox}>
        <div className={styles.viewToggle}></div>
      </div> */}
    </>
  );
}
