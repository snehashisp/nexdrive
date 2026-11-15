import { useMemo } from 'react';
import qrcode from 'qrcode-generator';

// A scannable QR code for `text`, drawn as one SVG path (one small square per dark module).
export default function QrCode({ text, size }) {
  const { path, total } = useMemo(() => {
    const qr = qrcode(0, 'M'); // 0 = pick the smallest QR version that fits; 'M' = medium error correction
    qr.addData(text);
    qr.make();
    const count = qr.getModuleCount();
    const margin = 4; // the blank "quiet zone" scanners need around the code
    let d = '';
    for (let row = 0; row < count; row++)
      for (let col = 0; col < count; col++) if (qr.isDark(row, col)) d += `M${col + margin} ${row + margin}h1v1h-1z`;
    return { path: d, total: count + margin * 2 };
  }, [text]);

  return (
    <div style={{ width: size, height: size }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${total} ${total}`}
        width={size}
        height={size}
        shapeRendering="crispEdges"
        role="img"
        aria-label="Referral QR code"
      >
        <rect width={total} height={total} fill="#FFFFFF" />
        <path d={path} fill="#0A0A0F" />
      </svg>
    </div>
  );
}
