import styles from './LogoutSheet.module.css';

export default function LogoutSheet({ v }) {
  const { ic, lo } = v;
  if (!lo) return null;
  return (
    <>
      <div className={styles.stack}>
        <span className={styles.logOutNexdrive}>Log out of NexDrive?</span>
        <span className={styles.yourLearnersLessons}>
          Your learners, lessons and settings stay safe in your account.
        </span>
      </div>
      <div className={styles.stack2}>
        <button onClick={lo.confirm} className={styles.logOutButton}>
          Log out{ic.logout}
        </button>
        <button onClick={lo.keep} className={styles.stayLoggedButton}>
          Stay logged in
        </button>
      </div>
    </>
  );
}
