// Ruang lantai di balik dua pintu lift.
export default function Shaft({ stage, color, children }) {
  const open = stage === 'opening' || stage === 'open';
  return (
    <div className={`shaft ${open ? 'is-open' : ''} ${stage === 'moving' ? 'moving' : ''}`}>
      <div className="room" style={{ background: color }}>{children}</div>
      <div className="door left" />
      <div className="door right" />
    </div>
  );
}
