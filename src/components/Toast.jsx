export default function Toast({ v }) {
  const { toast, toastB } = v;
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 70,
        left: '16px',
        right: '16px',
        bottom: `${toastB}px`,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 16px',
        background: toast.bg,
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 500,
        boxShadow: '0 10px 28px rgba(10,10,15,.28)',
        animation: 'nxUp .22s ease-out',
      }}
    >
      {toast.icon}
      <span style={{ flex: 1 }}>{toast.text}</span>
    </div>
  );
}
