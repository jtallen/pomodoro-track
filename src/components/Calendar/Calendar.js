import styles from './Calendar.module.css';
import Day from './Day';
import { dayNames } from '@/constants/index';

export default function Calendar({ times }) {
  return (
    <div className={styles.calendarBox}>
      <div className={styles.titleContainer}>
        <div className={styles.titleSpacer}></div>
        {dayNames.map((name) => (
          <div className={styles.dayTitle}>
            <h3>{name}</h3>
          </div>
        ))}
      </div>
      <div className={styles.dayContainer}>
        <div className={styles.timeLabelContainer}></div>
        <div className={styles.labelConnector}></div>

        {dayNames.map((name) => (
          <Day name={name} times={times[name]} />
        ))}
      </div>
    </div>
  );
}
