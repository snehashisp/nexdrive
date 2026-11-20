import { useLearnerFormView } from '../hooks/useLearnerFormView';
import styles from './LearnerForm.module.css';

export default function LearnerForm() {
  const v = useLearnerFormView();
  const { back, ic, icl, ics, lfm } = v;
  if (!lfm) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.x}
        </button>
        <span className={styles.title}>{lfm.title}</span>
      </div>
      <div className={styles.stack2}>
        {lfm.fromBooking ? (
          <div className={styles.warnRow}>
            {ic.warn}
            <span>
              <strong>Learner details incomplete.</strong> Please complete the required learner information
              before scheduling a driving lesson.
            </span>
          </div>
        ) : null}
        {lfm.hasErr ? (
          <div className={styles.alertRow}>
            {ic.alert}
            {lfm.errText}
          </div>
        ) : null}
        <div className={styles.row}>
          <span className={styles.requiredBookLessons}>REQUIRED TO BOOK LESSONS</span>
        </div>
        <label className={styles.label}>
          <span className={styles.fullNameRow}>
            Full name<span className={styles.required}>Required</span>
          </span>
          <input
            className={`${styles.input} focus-border-violet`}
            value={lfm.l.name ?? ''}
            onChange={lfm.h.name}
            placeholder="James Smith"
            style={{ border: `1.5px solid ${lfm.b.name}` }}
          />
          {lfm.e.name ? (
            <span className={styles.alertRow2}>
              {ics.alert}
              {lfm.e.name}
            </span>
          ) : null}
        </label>
        <label className={styles.label}>
          <span className={styles.fullNameRow}>
            Mobile number<span className={styles.required}>Required</span>
          </span>
          <input
            className={`${styles.input} focus-border-violet`}
            type="tel"
            value={lfm.l.phone ?? ''}
            onChange={lfm.h.phone}
            placeholder="07700 900456"
            style={{ border: `1.5px solid ${lfm.b.phone}` }}
          />
          {lfm.e.phone ? (
            <span className={styles.alertRow2}>
              {ics.alert}
              {lfm.e.phone}
            </span>
          ) : null}
        </label>
        <label className={styles.label}>
          <span className={styles.fullNameRow}>
            Pickup address<span className={styles.required}>Required</span>
          </span>
          <input
            className={`${styles.input} focus-border-violet`}
            value={lfm.l.address ?? ''}
            onChange={lfm.h.address}
            placeholder="27 Stoke Poges Lane, Slough"
            style={{ border: `1.5px solid ${lfm.b.address}` }}
          />
          {lfm.e.address ? (
            <span className={styles.alertRow2}>
              {ics.alert}
              {lfm.e.address}
            </span>
          ) : null}
        </label>
        <label className={styles.label}>
          <span className={styles.fullNameRow}>
            Postcode<span className={styles.required}>Required</span>
          </span>
          <input
            className={`${styles.input2} focus-border-violet`}
            value={lfm.l.postcode ?? ''}
            onChange={lfm.h.postcode}
            placeholder="SL1 3NY"
            style={{ border: `1.5px solid ${lfm.b.postcode}` }}
          />
          {lfm.e.postcode ? (
            <span className={styles.alertRow2}>
              {ics.alert}
              {lfm.e.postcode}
            </span>
          ) : null}
        </label>
        <label className={styles.label}>
          <span className={styles.fullNameRow}>
            Provisional driving licence number
            <span className={styles.required}>Required</span>
          </span>
          <input
            className={`${styles.input3} focus-border-violet`}
            value={lfm.l.licence ?? ''}
            onChange={lfm.h.licence}
            placeholder="SMITH 801157 J9 9AB"
            style={{ border: `1.5px solid ${lfm.b.licence}` }}
          />
          {lfm.e.licence ? (
            <span className={styles.alertRow2}>
              {ics.alert}
              {lfm.e.licence}
            </span>
          ) : null}
          <span className={styles.charactersFromSection}>
            16 characters, from section 5 of the photocard.
          </span>
        </label>
        <div className={styles.row2}>
          <span className={styles.optional}>OPTIONAL</span>
        </div>
        <label className={styles.label}>
          <span className={styles.fullNameRow}>
            Theory test pass certificate number
            <span className={styles.optional2}>Optional</span>
          </span>
          <input
            className={`${styles.input} focus-border-violet`}
            inputMode="numeric"
            value={lfm.l.theory ?? ''}
            onChange={lfm.h.theory}
            placeholder="8 digits"
            style={{ border: `1.5px solid ${lfm.b.theory}` }}
          />
          {lfm.e.theory ? (
            <span className={styles.alertRow2}>
              {ics.alert}
              {lfm.e.theory}
            </span>
          ) : null}
        </label>
        <label className={styles.label}>
          <span className={styles.fullNameRow}>
            Email address<span className={styles.optional2}>Optional</span>
          </span>
          <input
            className={`${styles.input} focus-border-violet`}
            type="email"
            value={lfm.l.email ?? ''}
            onChange={lfm.h.email}
            placeholder="name@example.co.uk"
            style={{ border: `1.5px solid ${lfm.b.email}` }}
          />
          {lfm.e.email ? (
            <span className={styles.alertRow2}>
              {ics.alert}
              {lfm.e.email}
            </span>
          ) : null}
        </label>
        <label className={styles.label}>
          <span className={styles.fullNameRow}>
            Notes<span className={styles.optional2}>Optional</span>
          </span>
          <textarea
            className={`${styles.textarea} focus-border-violet`}
            value={lfm.l.notes ?? ''}
            onChange={lfm.h.notes}
            rows={3}
            placeholder="Test date, things to practise…"
          />
        </label>
        <span className={styles.lockRow}>
          {ics.lock}Stored securely under UK GDPR and only used to manage this learner's lessons.
        </span>
      </div>
    </div>
  );
}

export function LearnerFormFooter() {
  const v = useLearnerFormView();
  const { ic, lfm, padB } = v;
  if (!lfm) return null;
  return (
    <div className={styles.stack3} style={{ padding: `12px 20px ${padB}px` }}>
      <button
        className={`${styles.primaryButton} hover-bg-violet-700 active-bg-violet-800`}
        onClick={lfm.saveBook}
      >
        {lfm.primary}
        {ic.arrow}
      </button>
      {lfm.showSecondary ? (
        <button className={`${styles.secondaryButton} hover-bg-mist`} onClick={lfm.save}>
          {lfm.secondary}
        </button>
      ) : null}
    </div>
  );
}
