export default function StatusBar({ v }) {
  const { clockTime, sbBg, sbFg, sbH } = v;
  return (
    <div
      style={{
        height: `${sbH}px`,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px 0 34px',
        fontSize: '15px',
        fontWeight: 600,
        background: sbBg,
        color: sbFg,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <span>{clockTime}</span>
      <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <span style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '11px' }}>
          <span style={{ width: '3px', height: '4px', background: 'currentColor' }} />
          <span style={{ width: '3px', height: '6px', background: 'currentColor' }} />
          <span style={{ width: '3px', height: '8px', background: 'currentColor' }} />
          <span style={{ width: '3px', height: '11px', background: 'currentColor' }} />
        </span>
        <span style={{ fontSize: '12px', fontWeight: 600 }}>5G</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
          <span
            style={{
              width: '22px',
              height: '11px',
              border: '1.5px solid currentColor',
              padding: '1.5px',
              boxSizing: 'border-box',
              display: 'flex',
            }}
          >
            <span style={{ width: '70%', background: 'currentColor' }} />
          </span>
          <span style={{ width: '2px', height: '4px', background: 'currentColor' }} />
        </span>
      </span>
    </div>
  );
}
