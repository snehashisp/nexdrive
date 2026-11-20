import { useBankDetailsView } from '../hooks/useBankDetailsView';
import styles from './BankDetails.module.css';

export default function BankDetails() {
  const v = useBankDetailsView();
  const { back, bk2, ic, icl, ics } = v;
  if (!bk2) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.bankDetails}>Bank details</span>
      </div>
      <div className={styles.stack2}>
        <div className={styles.lockRow}>
          {ic.lock}
          <span>
            Encrypted and stored securely. Your details are hidden in the app and only included in messages
            you choose to send to learners.
          </span>
        </div>
        {bk2.missing ? (
          <div className={styles.warnRow}>
            {ic.warn}
            <span>No bank details yet. Learners won't see how to pay you in lesson messages.</span>
          </div>
        ) : null}
        {bk2.saved ? (
          <>
            <div className={styles.stack3}>
              <div className={styles.row}>
                <span className={styles.paymentAccount}>PAYMENT ACCOUNT</span>
                <button onClick={bk2.reveal} className={styles.revealiconButton}>
                  {bk2.revealIcon}
                  {bk2.revealLabel}
                </button>
              </div>
              <div className={styles.row2}>
                <span className={styles.accountName}>Account name</span>
                <span className={styles.holder}>{bk2.holder}</span>
              </div>
              <div className={styles.row2}>
                <span className={styles.accountName}>Sort code</span>
                <span className={styles.sortm}>{bk2.sortM}</span>
              </div>
              <div className={styles.row3}>
                <span className={styles.accountName}>Account number</span>
                <span className={styles.sortm}>{bk2.acctM}</span>
              </div>
            </div>
            <div className={styles.grid}>
              <button onClick={bk2.edit} className={styles.editButton}>
                {ic.edit}Edit
              </button>
              <button onClick={bk2.remove} className={styles.trashButton}>
                {ic.trash}Remove
              </button>
            </div>
          </>
        ) : null}
        {bk2.editing ? (
          <>
            <label className={styles.label}>
              <span className={styles.accountHolderName}>Account holder name</span>
              <input
                className={`${styles.input} focus-border-violet`}
                value={bk2.f.holder ?? ''}
                onChange={bk2.h.holder}
                style={{ border: `1.5px solid ${bk2.b.holder}` }}
              />
              {bk2.e.holder ? (
                <span className={styles.alertRow}>
                  {ics.alert}
                  {bk2.e.holder}
                </span>
              ) : null}
            </label>
            <div className={styles.grid2}>
              <label className={styles.label}>
                <span className={styles.accountHolderName}>Sort code</span>
                <input
                  className={`${styles.input2} focus-border-violet`}
                  inputMode="numeric"
                  value={bk2.f.sort ?? ''}
                  onChange={bk2.h.sort}
                  placeholder="20-45-77"
                  style={{ border: `1.5px solid ${bk2.b.sort}` }}
                />
              </label>
              <label className={styles.label}>
                <span className={styles.accountHolderName}>Account number</span>
                <input
                  className={`${styles.input2} focus-border-violet`}
                  inputMode="numeric"
                  value={bk2.f.acct ?? ''}
                  onChange={bk2.h.acct}
                  placeholder="8 digits"
                  style={{ border: `1.5px solid ${bk2.b.acct}` }}
                />
              </label>
            </div>
            {bk2.e.sort ? (
              <span className={styles.alertRow2}>
                {ics.alert}
                {bk2.e.sort}
              </span>
            ) : null}
            {bk2.e.acct ? (
              <span className={styles.alertRow2}>
                {ics.alert}
                {bk2.e.acct}
              </span>
            ) : null}
            {bk2.canCancelEdit ? (
              <button onClick={bk2.cancelEdit} className={styles.cancelEditingButton}>
                Cancel editing
              </button>
            ) : null}
          </>
        ) : null}
        <button onClick={bk2.inc.flip} className={styles.button}>
          <span className={styles.stack4}>
            <span className={styles.includeLessonMessages}>Include in lesson messages</span>
            <span className={styles.addsPaymentSection}>
              Adds a payment section to booking details sent to learners
            </span>
          </span>
          <span className={styles.text} style={{ background: bk2.inc.bg }}>
            <span className={styles.overlay} style={{ left: `${bk2.inc.x}px` }} />
          </span>
        </button>
      </div>
    </div>
  );
}

export function BankDetailsFooter() {
  const v = useBankDetailsView();
  const { bk2, ic, padB } = v;
  if (!bk2) return null;
  return (
    <>
      {bk2.editing ? (
        <div className={styles.box} style={{ padding: `12px 20px ${padB}px` }}>
          <button className={`${styles.checkButton} hover-bg-violet-700`} onClick={bk2.save}>
            <span className={styles.lockRow2}>{ic.lock}Save bank details</span>
            {ic.check}
          </button>
        </div>
      ) : null}
    </>
  );
}
