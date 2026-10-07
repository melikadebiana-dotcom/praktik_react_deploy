export default function Display({ floor, direction }) {
  return (
    <div className="display" aria-hidden="true">
      <span className="arrow">{direction}</span>
      <span className="num">{floor}</span>
    </div>
  );
}
