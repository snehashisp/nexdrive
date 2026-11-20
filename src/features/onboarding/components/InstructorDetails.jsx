export default function InstructorDetails({ v }) {
  const { det, detB, detDur, detE, detStatus, hDet, ics } = v;
  return (
    <div style={{ padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1
          style={{ margin: 0, fontSize: '28px', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.1 }}
        >
          Your instructor details
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A' }}>
          We use these to verify your status and set up your prices.
        </p>
      </div>
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
          ADI registration number<span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
        </span>
        <input
          className="focus-border-violet"
          inputMode="numeric"
          maxLength="6"
          value={det.adi ?? ''}
          onChange={hDet.adi}
          placeholder="6 digits"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            height: '52px',
            padding: '0 14px',
            border: `1.5px solid ${detB.adi}`,
            background: '#FFFFFF',
            fontSize: '16px',
            letterSpacing: '0.12em',
            color: '#0A0A0F',
            outline: 'none',
          }}
        />
        {detE.adi ? (
          <span
            style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px', color: '#B91C1C' }}
          >
            {ics.alert}
            {detE.adi}
          </span>
        ) : null}
        <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Printed on your DVSA instructor badge.</span>
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Instructor status</span>
        {detStatus.map((o, i) => (
          <button
            key={i}
            onClick={o.pick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              width: '100%',
              padding: '14px 16px',
              textAlign: 'left',
              background: '#FFFFFF',
              border: `1.5px solid ${o.bd}`,
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
                border: o.ring,
                flex: 'none',
              }}
            />
            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
              <span style={{ fontSize: '15px', fontWeight: 600 }}>{o.t}</span>
              <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{o.d}</span>
            </span>
            <span style={{ width: '14px', height: '20px', background: o.badge, flex: 'none' }} />
          </button>
        ))}
      </div>
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
          Business name<span style={{ fontSize: '12px', color: '#6B6B7B' }}>Optional</span>
        </span>
        <input
          className="focus-border-violet"
          value={det.business ?? ''}
          onChange={hDet.business}
          placeholder="Wilson Driving School"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            height: '52px',
            padding: '0 14px',
            border: '1.5px solid #CFCFD8',
            background: '#FFFFFF',
            fontSize: '16px',
            color: '#0A0A0F',
            outline: 'none',
          }}
        />
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
          Postcode areas you cover<span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
        </span>
        <input
          className="focus-border-violet"
          value={det.areas ?? ''}
          onChange={hDet.areas}
          placeholder="SL1, SL2, SL3"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            height: '52px',
            padding: '0 14px',
            border: `1.5px solid ${detB.areas}`,
            background: '#FFFFFF',
            fontSize: '16px',
            color: '#0A0A0F',
            outline: 'none',
          }}
        />
        {detE.areas ? (
          <span
            style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px', color: '#B91C1C' }}
          >
            {ics.alert}
            {detE.areas}
          </span>
        ) : null}
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '12px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Hourly rate</span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '52px',
              border: `1.5px solid ${detB.rate}`,
              background: '#FFFFFF',
              boxSizing: 'border-box',
            }}
          >
            <span style={{ padding: '0 4px 0 14px', fontSize: '16px', color: '#6B6B7B' }}>£</span>
            <input
              inputMode="decimal"
              value={det.rate ?? ''}
              onChange={hDet.rate}
              style={{
                flex: 1,
                minWidth: 0,
                height: '100%',
                border: 0,
                padding: '0 8px 0 0',
                fontSize: '16px',
                fontWeight: 600,
                color: '#0A0A0F',
                outline: 'none',
                background: 'transparent',
              }}
            />
            <span style={{ paddingRight: '12px', fontSize: '14px', color: '#6B6B7B' }}>/hr</span>
          </span>
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Default lesson</span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              height: '52px',
              border: '1.5px solid #CFCFD8',
              boxSizing: 'border-box',
            }}
          >
            {detDur.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                style={{
                  border: 0,
                  background: o.bg,
                  color: o.fg,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {o.t}
              </button>
            ))}
          </div>
        </div>
      </div>
      {detE.rate ? (
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
          {detE.rate}
        </span>
      ) : null}
    </div>
  );
}
