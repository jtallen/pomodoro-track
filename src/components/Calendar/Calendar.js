import styles from './Calendar.module.css';
import Day from './Day';
import { useRef, useEffect } from 'react';
import { dayNames, hours } from '@/constants/index';

export default function Calendar({ times }) {
  const calendarRef = useRef(null);

  const formatHour = (hour) => {
    if (hour === undefined) return '';
    if (hour === 12) return '12:00 PM';

    return `${hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
  };

  // auto-scroll to 8am
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scrollTop = 473;
    }
  }, []);

  return (
    <div className={styles.calendarBox} ref={calendarRef}>
      <div className={styles.titleContainer}>
        <div className={styles.titleSpacer}></div>
        <div className={styles.dayTitleContainer}>
          {dayNames.map((name) => (
            <div key={name} className={styles.dayTitle}>
              <h3>{name}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.scheduleContainer}>
        <div className={styles.labelContainer}>
          <div className={styles.timeLabelContainer}>
            <div className={styles.labelSpacer}></div>
            {hours.slice(0, -1).map((hour) => {
              return (
                <div key={hour} className={styles.hourLabel}>
                  <p>{formatHour(hour)}</p>
                </div>
              );
            })}
            <div className={styles.labelSpacer}></div>
          </div>
          <div className={styles.labelConnectorColumn}>
            {hours.map((hour) => {
              return <div className={styles.labelConnector}></div>;
            })}
          </div>
        </div>

        <div className={styles.dayContainer}>
          {dayNames.map((name) => (
            <Day name={name} times={times[name]} />
          ))}
        </div>
      </div>
    </div>
  );
}
