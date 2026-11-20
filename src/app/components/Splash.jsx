// The NEXDrive launch animation shown over the app when it opens. Tap anywhere to skip it.
// `run` is a counter that goes up each time the animation is replayed. It makes the SVG ids unique,
// so a replay never points at the gradient or clip shapes of an older copy.

// CSS animation shorthand: name, duration and delay in seconds, and an easing curve.
const anim = (name, duration, delay, easing = 'cubic-bezier(.2,.8,.2,1)') => ({
  animation: `${name} ${duration}s ${easing} ${delay}s both`,
});

// Outline of the "N" in the monogram, drawn twice (top and bottom halves) so the halves can slide in.
const N_PATH = 'M0 140 L0 0 L26 0 L94 96 L94 0 L120 0 L120 140 L94 140 L26 44 L26 140 Z';

function Monogram({ id }) {
  const half = (clip) => (
    <g clipPath={`url(#${clip}${id})`}>
      <path d={N_PATH} fill={`url(#G${id})`} />
    </g>
  );
  return (
    <svg viewBox="0 0 200 160" width="74" height="59" style={{ overflow: 'visible', flex: 'none' }}>
      <defs>
        <linearGradient id={`G${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="130" y2="130">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset=".39" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
        <clipPath id={`T${id}`}>
          <polygon points="-40,120 160,22 160,-70 -40,-70" />
        </clipPath>
        <clipPath id={`B${id}`}>
          <polygon points="-40,130 160,32 160,230 -40,230" />
        </clipPath>
      </defs>
      <g transform="translate(40,10)">
        {/* faint "ghost" copies that trail behind the two halves */}
        {[3, 2, 1].map((i) => (
          <g key={i}>
            <g style={anim('aTopG', 0.55, 0.05 + i * 0.035, 'cubic-bezier(.3,.7,.2,1)')}>{half('T')}</g>
            <g style={anim('aBotG', 0.55, 0.05 + i * 0.035, 'cubic-bezier(.3,.7,.2,1)')}>{half('B')}</g>
          </g>
        ))}
        <g style={anim('aTop', 0.6, 0.05)}>{half('T')}</g>
        <g style={anim('aBot', 0.6, 0.05)}>{half('B')}</g>
        <line
          x1="-40"
          y1="125"
          x2="160"
          y2="27"
          stroke="#FFFFFF"
          strokeWidth="2"
          style={anim('aFlash', 0.35, 0.5, 'ease-out')}
        />
        <line
          x1="-2"
          y1="101"
          x2="-30"
          y2="115"
          stroke="#9333EA"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="32"
          style={anim('ndDraw', 0.3, 0.55)}
        />
        <line
          x1="122"
          y1="41"
          x2="150"
          y2="27"
          stroke="#9333EA"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="32"
          style={anim('ndDraw', 0.3, 0.6)}
        />
      </g>
    </svg>
  );
}

// "NEXDrive": the three letters drop in one by one, then "Drive" speeds in with motion lines behind it.
function Wordmark() {
  const speedLines = [
    [28, 54],
    [50, 80],
    [72, 40],
  ];
  return (
    <span
      style={{
        fontSize: 36,
        fontWeight: 500,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ letterSpacing: '.105em', display: 'flex' }}>
        {'NEX'.split('').map((letter, i) => (
          <span key={i} style={{ display: 'inline-block', ...anim('aLetter', 0.45, 0.55 + i * 0.07) }}>
            {letter}
          </span>
        ))}
      </span>
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          color: '#7C3AED',
          marginLeft: '-0.06em',
          letterSpacing: '.005em',
          ...anim('aDrive', 0.7, 0.85, 'cubic-bezier(.15,.85,.25,1)'),
        }}
      >
        Drive
        {speedLines.map(([top, width], i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              right: '100%',
              marginRight: 6,
              top: `${top}%`,
              height: 2,
              width,
              background: 'linear-gradient(90deg,transparent,#A78BFA)',
              transformOrigin: 'right',
              ...anim('aLine', 0.75, 0.85 + i * 0.03, 'ease-out'),
            }}
          />
        ))}
      </span>
    </span>
  );
}

export default function Splash({ run, fadingOut, onSkip }) {
  const id = 'sp' + run;
  return (
    <div
      onClick={onSkip}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        cursor: 'pointer',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity .4s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0A0A0F',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 32px',
          overflow: 'hidden',
          fontFamily: "'Hanken Grotesk','Helvetica Neue',Arial,sans-serif",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#FFFFFF' }}>
          <Monogram id={id} />
          <Wordmark />
        </div>
        <div style={{ marginTop: 20, fontSize: 14, color: '#8A8A9C', ...anim('ndUp', 0.5, 1.55) }}>
          Lessons, learners and bookings
        </div>
        <div
          style={{
            position: 'absolute',
            left: 32,
            right: 32,
            bottom: 64,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ height: 2, background: '#1A1A24', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg,#A78BFA,#7C3AED 39%,#3B82F6)',
                transformOrigin: 'left',
                ...anim('ndBar', 1.2, 1.55, 'cubic-bezier(.4,0,.2,1)'),
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '.18em',
              color: '#8A8A9C',
              ...anim('ndFade', 0.4, 1.55),
            }}
          >
            <span>LOADING</span>
            <span>A NEXYRA PRODUCT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
