import styles from './Calendar.module.css';
import Day from './Day';
import { dayNames } from '@/constants/index';

export default function Calendar({ times }) {
  return (
    <div className={styles.calendarBox}>
      {dayNames.map((name) => (
        <Day name={name} times={times[name]} />
      ))}
    </div>
  );
}
