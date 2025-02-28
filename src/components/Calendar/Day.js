import styles from './Calendar.module.css';

export default function Day({ name, times }) {
  return (
    <div className={styles.dayColumn}>
      {Array.from({ length: 24 }, (_, i) => (
        <div key={i} className={styles.hour}></div>
      ))}
    </div>
  );
}
