export default function ChoosePlan({ v }) {
  const { addCard, ic, ics, obCard, obCardB, obCardErr, obNoCard, obPlans, obSum } = v;
  return (
    <div style={{ padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1
          style={{ margin: 0, fontSize: '28px', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.1 }}
        >
          Start your 14-day free trial
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A' }}>
          Full access to every feature. Choose the plan that starts when your trial ends.
        </p>
      </div>
      {obSum.ref ? (
        <div style={{ display: 'flex', flexDirection: 'column', border: '1.5px solid #7C3AED' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '10px 14px',
              background: '#7C3AED',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
            }}
          >
            <span>YOUR REFERRAL BENEFIT</span>
            <span style={{ letterSpacing: '0.08em' }}>{obSum.ref.code} ✓</span>
          </div>
          <div
            style={{
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              background: '#F7F5FF',
            }}
          >
            <span style={{ fontSize: '17px', fontWeight: 600, lineHeight: 1.3 }}>
              14-day free trial <span style={{ color: '#6D28D9' }}>+</span> 1 additional month free
            </span>
            <span style={{ fontSize: '13px', lineHeight: 1.5, color: '#4A4A5A' }}>
              Your additional free month will be applied after your 14-day trial. Your first payment is on{' '}
              {obSum.ref.first}.
            </span>
          </div>
        </div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #0A0A0F' }}>
        {obSum.tl.map((x, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '76px 1fr',
              gap: '12px',
              padding: '12px 0',
              borderBottom: '1px solid #E7E7EC',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 600, color: x.c }}>{x.d}</span>
            <span style={{ fontSize: '14px', lineHeight: 1.45 }}>{x.t}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
          CHOOSE YOUR PLAN
        </span>
        {obPlans.map((pl, i) => (
          <button
            key={i}
            onClick={pl.pick}
            style={{
              display: 'grid',
              gridTemplateColumns: '22px minmax(0,1fr) auto',
              alignItems: 'center',
              gap: '14px',
              width: '100%',
              padding: '16px',
              textAlign: 'left',
              background: pl.bg,
              border: pl.bd,
              cursor: 'pointer',
              color: '#0A0A0F',
            }}
          >
            <span
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                boxSizing: 'border-box',
                border: pl.ring,
              }}
            />
            <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                {pl.name}
                {pl.save ? (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 7px',
                      background: '#DCFCE7',
                      color: '#166534',
                    }}
                  >
                    {pl.save}
                  </span>
                ) : null}
              </span>
              <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{pl.term}</span>
              {pl.ref ? (
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#6D28D9' }}>
                  + 1 month free through referral
                </span>
              ) : null}
            </span>
            <span style={{ textAlign: 'right' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '18px',
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {pl.price}
              </span>
              <span style={{ fontSize: '12px', color: '#6B6B7B' }}>{pl.per}</span>
            </span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
          PAYMENT METHOD
        </span>
        {obCard ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              border: '1.5px solid #CFCFD8',
            }}
          >
            <span style={{ color: '#0A0A0F' }}>{ic.card}</span>
            <span style={{ flex: 1, fontSize: '15px', fontWeight: 500 }}>Visa •••• 4242</span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                color: '#166534',
              }}
            >
              {ics.check}Saved
            </span>
          </div>
        ) : null}
        {obNoCard ? (
          <>
            <button
              onClick={addCard}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '14px 16px',
                textAlign: 'left',
                background: '#FFFFFF',
                border: `1.5px dashed ${obCardB}`,
                cursor: 'pointer',
                color: '#0A0A0F',
                fontSize: '15px',
                fontWeight: 500,
              }}
            >
              {ic.plus}Add a debit or credit card
            </button>
            {obCardErr ? (
              <span
                style={{
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  fontSize: '13px',
                  color: '#B91C1C',
                }}
              >
                {ics.alert}Add a card to start your trial. You won't be charged today.
              </span>
            ) : null}
          </>
        ) : null}
      </div>
      <div
        style={{
          padding: '16px',
          background: '#F7F7F9',
          border: '1px solid #E7E7EC',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '13px',
          lineHeight: 1.55,
          color: '#4A4A5A',
        }}
      >
        <span style={{ fontWeight: 600, color: '#0A0A0F', fontSize: '14px' }}>How renewal works</span>
        <span>{obSum.renew}</span>
        <span>Cancel any time during your trial in Account → Subscription and you won't be charged.</span>
      </div>
    </div>
  );
}
