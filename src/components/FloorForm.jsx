import { useState } from 'react';

export default function FloorForm({ floor, onSubmit }) {
  const [values, setValues] = useState({});
  const [error, setError] = useState('');
  const set = (name, value) => setValues((p) => ({ ...p, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = floor.fields.find((f) => f.required && !String(values[f.name] || '').trim());
    if (missing) return setError(`${missing.label} belum diisi.`);
    setError('');
    onSubmit(values);
  };

  return (
    <form className="floor-form" onSubmit={handleSubmit} noValidate>
      <h2>Lantai {floor.id}: {floor.name}</h2>
      {floor.fields.map((f) => (
        <label key={f.name}>
          {f.label}{f.required ? '' : ' (opsional)'}
          {f.type === 'textarea' ? (
            <textarea rows={3} value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)} />
          ) : f.type === 'select' ? (
            <select value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)}>
              <option value="">Pilih…</option>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input
              type={f.type} min={f.min} max={f.max}
              value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)}
            />
          )}
        </label>
      ))}
      <p className="error" role="alert">{error}</p>
      <button type="submit" className="send">Kirim</button>
    </form>
  );
}
