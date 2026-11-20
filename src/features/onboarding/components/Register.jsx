export default function Register({ v }) {
  const { hReg, ic, ics, obInvite, pwRules, reg, regB, regE, rfo, sampleReg } = v;
  return (
    <div style={{ padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1
          style={{ margin: 0, fontSize: '28px', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.1 }}
        >
          Create your account
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A' }}>
          Your login and the contact details learners will see.
        </p>
        <button
          onClick={sampleReg}
          style={{
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 0',
            background: 'transparent',
            border: 0,
            color: '#6D28D9',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {ics.copy}Use sample details
        </button>
      </div>
      {obInvite ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '14px 16px',
            background: '#F7F5FF',
            border: '1.5px solid #7C3AED',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6D28D9' }}>
            YOU'VE BEEN INVITED BY {obInvite.byCaps}
          </span>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>
            14-day free trial + 1 additional month free
          </span>
          <span
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#14532D' }}
          >
            {ics.check}Referral code <strong style={{ letterSpacing: '0.06em' }}>{obInvite.code}</strong>{' '}
            applied
          </span>
        </div>
      ) : null}
      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            fontWeight: 500,
            color: '#4A4A5A',
          }}
        >
          Full name<span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
        </span>
        <input
          className="focus-border-violet"
          value={reg.name ?? ''}
          onChange={hReg.name}
          autoComplete="name"
          placeholder="Daniel Wilson"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            height: '52px',
            padding: '0 14px',
            border: `1.5px solid ${regB.name}`,
            background: '#FFFFFF',
            fontSize: '16px',
            color: '#0A0A0F',
            outline: 'none',
          }}
        />
        {regE.name ? (
          <span
            style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px', color: '#B91C1C' }}
          >
            {ics.alert}
            {regE.name}
          </span>
        ) : null}
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            fontWeight: 500,
            color: '#4A4A5A',
          }}
        >
          Mobile number<span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
        </span>
        <input
          className="focus-border-violet"
          type="tel"
          value={reg.phone ?? ''}
          onChange={hReg.phone}
          placeholder="07700 900123"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            height: '52px',
            padding: '0 14px',
            border: `1.5px solid ${regB.phone}`,
            background: '#FFFFFF',
            fontSize: '16px',
            color: '#0A0A0F',
            outline: 'none',
          }}
        />
        {regE.phone ? (
          <span
            style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px', color: '#B91C1C' }}
          >
            {ics.alert}
            {regE.phone}
          </span>
        ) : null}
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            fontWeight: 500,
            color: '#4A4A5A',
          }}
        >
          Email address<span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
        </span>
        <input
          className="focus-border-violet"
          type="email"
          value={reg.email ?? ''}
          onChange={hReg.email}
          placeholder="name@example.co.uk"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            height: '52px',
            padding: '0 14px',
            border: `1.5px solid ${regB.email}`,
            background: '#FFFFFF',
            fontSize: '16px',
            color: '#0A0A0F',
            outline: 'none',
          }}
        />
        {regE.email ? (
          <span
            style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px', color: '#B91C1C' }}
          >
            {ics.alert}
            {regE.email}
          </span>
        ) : null}
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            fontWeight: 500,
            color: '#4A4A5A',
          }}
        >
          Password<span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
        </span>
        <input
          className="focus-border-violet"
          type="password"
          value={reg.password ?? ''}
          onChange={hReg.password}
          placeholder="At least 8 characters"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            height: '52px',
            padding: '0 14px',
            border: `1.5px solid ${regB.password}`,
            background: '#FFFFFF',
            fontSize: '16px',
            color: '#0A0A0F',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
          {pwRules.map((r, i) => (
            <span
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: r.c }}
            >
              {ics.check}
              {r.t}
            </span>
          ))}
        </div>
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            fontWeight: 500,
            color: '#4A4A5A',
          }}
        >
          Referral code (optional)<span style={{ fontSize: '12px', color: '#6B6B7B' }}>Optional</span>
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '8px' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '52px',
              border: `1.5px solid ${rfo.bd}`,
              background: '#FFFFFF',
              boxSizing: 'border-box',
            }}
          >
            <input
              value={rfo.code ?? ''}
              onChange={rfo.h}
              placeholder="e.g. NEXDANIEL25"
              autoCapitalize="characters"
              autoComplete="off"
              style={{
                flex: 1,
                minWidth: 0,
                height: '100%',
                border: 0,
                padding: '0 14px',
                fontSize: '16px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                outline: 'none',
                background: 'transparent',
                color: '#0A0A0F',
              }}
            />
            {rfo.ok ? <span style={{ paddingRight: '14px', color: '#166534' }}>{ic.check}</span> : null}
          </span>
          {rfo.showApply ? (
            <button
              className="hover-bg-ink-2"
              onClick={rfo.apply}
              style={{
                height: '52px',
                padding: '0 18px',
                background: '#0A0A0F',
                color: '#FFFFFF',
                border: 0,
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Apply
            </button>
          ) : null}
          {rfo.ok ? (
            <button
              className="hover-border-ink"
              onClick={rfo.remove}
              style={{
                height: '52px',
                padding: '0 14px',
                background: '#FFFFFF',
                color: '#0A0A0F',
                border: '1.5px solid #CFCFD8',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          ) : null}
        </div>
        {rfo.ok ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              padding: '12px 14px',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              color: '#14532D',
            }}
          >
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600 }}
            >
              {ics.check}Referral code applied
            </span>
            <span style={{ fontSize: '13px', lineHeight: 1.5 }}>
              You get a 14-day free trial plus 1 additional month free. Invited by {rfo.by}.
            </span>
          </div>
        ) : null}
        {rfo.err ? (
          <>
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'flex-start',
                fontSize: '13px',
                lineHeight: 1.45,
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {rfo.err}
            </span>
            <button
              onClick={rfo.remove}
              style={{
                alignSelf: 'flex-start',
                padding: '2px 0',
                background: 'transparent',
                border: 0,
                color: '#6D28D9',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Continue without a referral code
            </button>
          </>
        ) : null}
        {rfo.hint ? (
          <span style={{ fontSize: '12px', lineHeight: 1.5, color: '#6B6B7B' }}>{rfo.hint}</span>
        ) : null}
      </div>
      <label
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          cursor: 'pointer',
          fontSize: '14px',
          lineHeight: 1.5,
          color: '#4A4A5A',
        }}
      >
        <input
          type="checkbox"
          checked={!!reg.terms}
          onChange={hReg.terms}
          style={{ width: '22px', height: '22px', margin: 0, accentColor: '#7C3AED', flex: 'none' }}
        />
        <span>
          I agree to the NexDrive Terms of Service and Privacy Policy, including how learner data is stored
          under UK GDPR.
        </span>
      </label>
      {regE.terms ? (
        <span
          style={{
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            fontSize: '13px',
            color: '#B91C1C',
            marginTop: '-12px',
          }}
        >
          {ics.alert}
          {regE.terms}
        </span>
      ) : null}
    </div>
  );
}
