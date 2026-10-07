export default function Panel({ floors, current, target, stage, onPress }) {
  const ready = stage === 'closed' || stage === 'open';
  const atFloor = stage === 'opening' || stage === 'open';
  return (
    <nav className="panel" aria-label="Panel tombol lift">
      {[...floors].reverse().map((f) => {
        const lit = target === f.id && (stage === 'closing' || stage === 'moving');
        const here = current === f.id && atFloor;
        return (
          <div className="panel-row" key={f.id}>
            <button
              type="button"
              className={`floor-btn ${lit ? 'lit' : ''} ${here ? 'here' : ''}`}
              onClick={() => onPress(f.id)}
              disabled={!ready}
              aria-label={`Lantai ${f.id}: ${f.name}`}
            >
              {f.id}
            </button>
            <span>{f.name}</span>
          </div>
        );
      })}
    </nav>
  );
}
