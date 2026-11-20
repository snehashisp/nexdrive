import styles from './Toast.module.css';

export default function Toast({ v }) {
  const { toast, toastB } = v;
  return (
    <div className={styles.iconOverlay} style={{ bottom: `${toastB}px`, background: toast.bg }}>
      {toast.icon}
      <span className={styles.text}>{toast.text}</span>
    </div>
  );
}
