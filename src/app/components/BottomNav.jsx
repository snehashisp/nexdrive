export default function BottomNav({ v }) {
  const { go, ic, icl, nav, navPadB } = v;
  return (
    <nav
      style={{
        flex: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(5,1fr)',
        alignItems: 'stretch',
        background: '#FFFFFF',
        borderTop: '2px solid #0A0A0F',
        paddingBottom: `${navPadB}px`,
      }}
    >
      <button
        onClick={go.home}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          height: '60px',
          background: 'transparent',
          border: 0,
          boxShadow: nav.home.bar,
          color: nav.home.c,
          fontSize: '11px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {ic.home}Home
      </button>
      <button
        onClick={go.calendar}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          height: '60px',
          background: 'transparent',
          border: 0,
          boxShadow: nav.calendar.bar,
          color: nav.calendar.c,
          fontSize: '11px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {ic.calendar}Calendar
      </button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          className="hover-bg-violet-700 active-bg-violet-800"
          onClick={go.quick}
          aria-label="New"
          style={{
            width: '52px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#7C3AED',
            color: '#FFFFFF',
            border: 0,
            cursor: 'pointer',
          }}
        >
          {icl.plus}
        </button>
      </div>
      <button
        onClick={go.learners}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          height: '60px',
          background: 'transparent',
          border: 0,
          boxShadow: nav.learners.bar,
          color: nav.learners.c,
          fontSize: '11px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {ic.users}Learners
      </button>
      <button
        onClick={go.more}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          height: '60px',
          background: 'transparent',
          border: 0,
          boxShadow: nav.more.bar,
          color: nav.more.c,
          fontSize: '11px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {ic.menu}More
      </button>
    </nav>
  );
}
