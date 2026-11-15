export default function BankDetails({ v }) {
  const { back, bk2, ic, icl, ics } = v;
  if (!bk2) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '28px' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 5,
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          height: '56px',
          padding: '0 12px 0 4px',
          borderBottom: '2px solid #0A0A0F',
        }}
      >
        <button
          className="hover-bg-mist"
          onClick={back}
          aria-label="Back"
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          {icl.left}
        </button>
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Bank details</span>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            padding: '12px 14px',
            background: '#F7F7F9',
            border: '1px solid #E7E7EC',
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#4A4A5A',
          }}
        >
          {ic.lock}
          <span>
            Encrypted and stored securely. Your details are hidden in the app and only included in messages
            you choose to send to learners.
          </span>
        </div>
        {bk2.missing ? (
          <div
            style={{
              display: 'flex',
              gap: '10px',
              padding: '12px 14px',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              fontSize: '14px',
              lineHeight: 1.5,
              color: '#78350F',
            }}
          >
            {ic.warn}
            <span>No bank details yet. Learners won't see how to pay you in lesson messages.</span>
          </div>
        ) : null}
        {bk2.saved ? (
          <>
            <div style={{ border: '1.5px solid #0A0A0F', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderBottom: '1px solid #E7E7EC',
                }}
              >
                <span
                  style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}
                >
                  PAYMENT ACCOUNT
                </span>
                <button
                  onClick={bk2.reveal}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: 0,
                    background: 'transparent',
                    border: 0,
                    color: '#6D28D9',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {bk2.revealIcon}
                  {bk2.revealLabel}
                </button>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: '1px solid #E7E7EC',
                  fontSize: '15px',
                }}
              >
                <span style={{ color: '#4A4A5A' }}>Account name</span>
                <span style={{ fontWeight: 600 }}>{bk2.holder}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: '1px solid #E7E7EC',
                  fontSize: '15px',
                }}
              >
                <span style={{ color: '#4A4A5A' }}>Sort code</span>
                <span
                  style={{ fontWeight: 600, letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}
                >
                  {bk2.sortM}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: '15px',
                }}
              >
                <span style={{ color: '#4A4A5A' }}>Account number</span>
                <span
                  style={{ fontWeight: 600, letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}
                >
                  {bk2.acctM}
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={bk2.edit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '48px',
                  padding: '0 14px',
                  background: '#FFFFFF',
                  color: '#0A0A0F',
                  border: '1.5px solid #0A0A0F',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {ic.edit}Edit
              </button>
              <button
                onClick={bk2.remove}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '48px',
                  padding: '0 14px',
                  background: '#FFFFFF',
                  color: '#B91C1C',
                  border: '1.5px solid #B91C1C',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {ic.trash}Remove
              </button>
            </div>
          </>
        ) : null}
        {bk2.editing ? (
          <>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Account holder name</span>
              <input
                className="focus-border-violet"
                value={bk2.f.holder ?? ''}
                onChange={bk2.h.holder}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  height: '52px',
                  padding: '0 14px',
                  border: `1.5px solid ${bk2.b.holder}`,
                  fontSize: '16px',
                  outline: 'none',
                }}
              />
              {bk2.e.holder ? (
                <span
                  style={{
                    display: 'flex',
                    gap: '6px',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: '#B91C1C',
                  }}
                >
                  {ics.alert}
                  {bk2.e.holder}
                </span>
              ) : null}
            </label>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)', gap: '8px' }}
            >
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Sort code</span>
                <input
                  className="focus-border-violet"
                  inputMode="numeric"
                  value={bk2.f.sort ?? ''}
                  onChange={bk2.h.sort}
                  placeholder="20-45-77"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '52px',
                    padding: '0 14px',
                    border: `1.5px solid ${bk2.b.sort}`,
                    fontSize: '16px',
                    letterSpacing: '0.06em',
                    outline: 'none',
                  }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Account number</span>
                <input
                  className="focus-border-violet"
                  inputMode="numeric"
                  value={bk2.f.acct ?? ''}
                  onChange={bk2.h.acct}
                  placeholder="8 digits"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '52px',
                    padding: '0 14px',
                    border: `1.5px solid ${bk2.b.acct}`,
                    fontSize: '16px',
                    letterSpacing: '0.06em',
                    outline: 'none',
                  }}
                />
              </label>
            </div>
            {bk2.e.sort ? (
              <span
                style={{
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  fontSize: '13px',
                  color: '#B91C1C',
                  marginTop: '-8px',
                }}
              >
                {ics.alert}
                {bk2.e.sort}
              </span>
            ) : null}
            {bk2.e.acct ? (
              <span
                style={{
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  fontSize: '13px',
                  color: '#B91C1C',
                  marginTop: '-8px',
                }}
              >
                {ics.alert}
                {bk2.e.acct}
              </span>
            ) : null}
            {bk2.canCancelEdit ? (
              <button
                onClick={bk2.cancelEdit}
                style={{
                  alignSelf: 'flex-start',
                  padding: 0,
                  background: 'transparent',
                  border: 0,
                  color: '#4A4A5A',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel editing
              </button>
            ) : null}
          </>
        ) : null}
        <button
          onClick={bk2.inc.flip}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 0',
            background: 'transparent',
            border: 0,
            borderTop: '1px solid #E7E7EC',
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Include in lesson messages</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
              Adds a payment section to booking details sent to learners
            </span>
          </span>
          <span
            style={{
              width: '48px',
              height: '28px',
              flex: 'none',
              background: bk2.inc.bg,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '3px',
                left: `${bk2.inc.x}px`,
                width: '22px',
                height: '22px',
                background: '#FFFFFF',
              }}
            />
          </span>
        </button>
      </div>
    </div>
  );
}

export function BankDetailsFooter({ v }) {
  const { bk2, ic, padB } = v;
  if (!bk2) return null;
  return (
    <>
      {bk2.editing ? (
        <div
          style={{
            flex: 'none',
            padding: `12px 20px ${padB}px`,
            background: '#FFFFFF',
            borderTop: '2px solid #0A0A0F',
          }}
        >
          <button
            className="hover-bg-violet-700"
            onClick={bk2.save}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              height: '52px',
              padding: '0 18px',
              background: '#7C3AED',
              color: '#FFFFFF',
              border: 0,
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {ic.lock}Save bank details
            </span>
            {ic.check}
          </button>
        </div>
      ) : null}
    </>
  );
}
