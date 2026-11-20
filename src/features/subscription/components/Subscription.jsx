export default function Subscription({ v }) {
  const { back, go, ic, icl, ics, sb } = v;
  if (!sb) return null;
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
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Subscription</span>
      </div>
      {sb.banner ? (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            padding: '14px 20px',
            background: sb.banner.bg,
            color: sb.banner.fg,
            borderBottom: `1px solid ${sb.banner.bd}`,
            fontSize: '14px',
            lineHeight: 1.5,
          }}
        >
          {ic.warn}
          <span>{sb.banner.t}</span>
        </div>
      ) : null}
      <div
        style={{
          padding: '20px 20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          borderBottom: '1px solid #E7E7EC',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              background: sb.tagBg,
              color: sb.tagFg,
            }}
          >
            {sb.tag}
          </span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Current plan</span>
        </span>
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}
        >
          <span style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.025em' }}>{sb.planName}</span>
          <span style={{ fontSize: '24px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {sb.price}
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#6B6B7B' }}>/mo</span>
          </span>
        </div>
        <span style={{ fontSize: '14px', color: '#166534', fontWeight: 500 }}>{sb.save}</span>
        {sb.isTrial ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
            <span style={{ height: '6px', background: '#EDE9FE', display: 'flex' }}>
              <span style={{ width: `${sb.trialPct}%`, background: '#7C3AED' }} />
            </span>
            <span
              style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4A4A5A' }}
            >
              <span>{sb.trialLeft}</span>
              <span>Ends {sb.trialEnd}</span>
            </span>
          </div>
        ) : null}
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column' }}>
        {sb.rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '13px 0',
              borderBottom: '1px solid #E7E7EC',
              fontSize: '15px',
            }}
          >
            <span style={{ color: '#4A4A5A', flex: 'none' }}>{r.k}</span>
            <span style={{ fontWeight: 600, textAlign: 'right' }}>{r.v}</span>
          </div>
        ))}
      </div>
      {sb.credit ? (
        <button
          className="hover-bg-violet-100"
          onClick={go.credit}
          style={{
            display: 'grid',
            gridTemplateColumns: '40px minmax(0,1fr) auto',
            alignItems: 'center',
            gap: '12px',
            margin: '16px 20px 0',
            padding: '14px',
            background: '#F7F5FF',
            border: '1.5px solid #7C3AED',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span
            style={{
              width: '40px',
              height: '40px',
              background: '#EDE9FE',
              color: '#6D28D9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {ic.gift}
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>{sb.credit.bal} NexDrive Credit</span>
            <span style={{ fontSize: '13px', color: '#4A4A5A' }}>{sb.credit.t}</span>
          </span>
          <span style={{ color: '#6D28D9' }}>{ics.right}</span>
        </button>
      ) : null}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sb.fixPay ? (
          <button
            className="hover-bg-violet-700"
            onClick={sb.fixPayGo}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
            Update payment method{ic.arrow}
          </button>
        ) : null}
        {sb.renew ? (
          <button
            className="hover-bg-violet-700"
            onClick={sb.renewGo}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
            Renew subscription{ic.arrow}
          </button>
        ) : null}
        {sb.canUpgrade ? (
          <button
            className="hover-bg-violet-700 active-bg-violet-800"
            onClick={sb.upgrade}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
              {ic.upgrade}Upgrade subscription
            </span>
            {ic.arrow}
          </button>
        ) : null}
        {sb.maxed ? (
          <span style={{ fontSize: '14px', color: '#4A4A5A' }}>
            You're on the longest term and best monthly price.
          </span>
        ) : null}
        {sb.isCancelled ? (
          <button
            onClick={sb.resume}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
            Resume subscription{ic.arrow}
          </button>
        ) : null}
        {sb.canCancel ? (
          <button
            className="hover-bg-error"
            onClick={sb.cancel}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '50px',
              padding: '0 18px',
              background: '#FFFFFF',
              color: '#B91C1C',
              border: '1.5px solid #B91C1C',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {sb.cancelLabel}
          </button>
        ) : null}
        <span style={{ fontSize: '13px', lineHeight: 1.55, color: '#6B6B7B' }}>
          Plans renew automatically at the end of each term unless cancelled. Cancelling during the 14-day
          trial costs nothing. Prices include VAT.
        </span>
      </div>
    </div>
  );
}
