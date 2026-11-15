export default function VerifyPhone({ v }) {
  const { fillOtp, hOtp, ics, otp, otpB, otpErr, reg, resendLabel, resendOtp } = v;
  return (
    <div style={{ padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1
          style={{ margin: 0, fontSize: '28px', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.1 }}
        >
          Confirm your mobile
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A' }}>
          Enter the 6-digit code we sent to <strong style={{ color: '#0A0A0F' }}>{reg.phone}</strong>.
        </p>
      </div>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Verification code</span>
        <input
          className="focus-border-violet"
          inputMode="numeric"
          maxLength="6"
          value={otp ?? ''}
          onChange={hOtp}
          placeholder="000000"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            height: '64px',
            padding: '0 16px',
            border: `1.5px solid ${otpB}`,
            background: '#FFFFFF',
            fontSize: '30px',
            fontWeight: 600,
            letterSpacing: '0.5em',
            color: '#0A0A0F',
            outline: 'none',
            fontVariantNumeric: 'tabular-nums',
          }}
        />
        {otpErr ? (
          <span
            style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px', color: '#B91C1C' }}
          >
            {ics.alert}
            {otpErr}
          </span>
        ) : null}
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '14px 16px',
          background: '#F7F7F9',
          border: '1px solid #E7E7EC',
          fontSize: '14px',
          color: '#4A4A5A',
        }}
      >
        <span>
          Demo code: <strong style={{ color: '#0A0A0F', letterSpacing: '0.1em' }}>482913</strong>
        </span>
        <button
          onClick={fillOtp}
          style={{
            padding: '8px 0',
            background: 'transparent',
            border: 0,
            color: '#6D28D9',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Paste code
        </button>
      </div>
      <button
        onClick={resendOtp}
        style={{
          alignSelf: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 0',
          background: 'transparent',
          border: 0,
          color: '#0A0A0F',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {ics.refresh}
        {resendLabel}
      </button>
    </div>
  );
}
