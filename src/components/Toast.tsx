import styles from './Toast.module.css';

// A short message near the bottom of the screen. `toast` = { text, bg, icon }; `bottom` is in pixels.
export default function Toast({ toast, bottom }) {
  return (
    <div className={styles.iconOverlay} style={{ bottom: `${bottom}px`, background: toast.bg }}>
      {toast.icon}
      <span className={styles.text}>{toast.text}</span>
    </div>
  );
}
