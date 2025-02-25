import styles from './Calendar.module.css';

export default function Day({ name, times }) {
  return (
    <div className={styles.dayColumn}>
      <div className={styles.dayTitle}>
        <h3>{name}</h3>
      </div>
      {Array.from({ length: 24 }, (_, i) => (
        <div key={i} className={styles.hour}>
          <p>{i + 1}:00</p>
        </div>
      ))}
    </div>
  );
}
