import { useEffect, useState } from 'react';
import { floors } from '../data/floors.js';
import { useService } from '../context/ServiceContext.jsx';
import Display from '../components/Display.jsx';
import Panel from '../components/Panel.jsx';
import Shaft from '../components/Shaft.jsx';
import FloorForm from '../components/FloorForm.jsx';

// Tahap: closed -> (closing) -> moving -> opening -> open
export default function Home() {
  const { submissions, addSubmission } = useService();
  const [stage, setStage] = useState('closed');
  const [current, setCurrent] = useState(1);
  const [target, setTarget] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let t;
    if (stage === 'closing') {
      t = setTimeout(() => {
        setDone(false);
        setStage(target == null ? 'closed' : 'moving');
      }, 900);
    } else if (stage === 'opening') {
      t = setTimeout(() => setStage('open'), 900);
    } else if (stage === 'moving') {
      t = current === target
        ? setTimeout(() => setStage('opening'), 400)
        : setTimeout(() => setCurrent((c) => c + (target > c ? 1 : -1)), 700);
    }
    return () => clearTimeout(t);
  }, [stage, current, target]);

  const press = (id) => {
    if (stage === 'closed') {
      setTarget(id);
      setStage(id === current ? 'opening' : 'moving');
    } else if (stage === 'open' && id !== current) {
      setTarget(id);
      setStage('closing');
    }
  };

  const handleSubmit = (values) => {
    addSubmission(current, values);
    setDone(true);
  };

  const closeDoors = () => {
    setTarget(null);
    setStage('closing');
  };

  const floor = floors.find((f) => f.id === current);
  const last = submissions[submissions.length - 1];
  const direction = stage === 'moving' && current !== target ? (target > current ? '▲' : '▼') : '';

  const status = {
    closed: 'Tekan nomor lantai untuk memilih layanan.',
    closing: 'Pintu menutup…',
    moving: `Menuju lantai ${target}…`,
    opening: 'Pintu terbuka.',
    open: `Lantai ${current}: ${floor.name}`,
  }[stage];

  return (
    <section className="lift">
      <div className="cabin">
        <Display floor={current} direction={direction} />
        <Shaft stage={stage} color={floor.color}>
          {done ? (
            <div className="success">
              <p className="big">Terkirim!</p>
              <p>Terima kasih, {last?.values.nama || 'Sahabat'}. Permintaanmu di lantai {current} sudah kami terima.</p>
              <button type="button" className="send" onClick={closeDoors}>Tutup pintu</button>
            </div>
          ) : (
            <FloorForm key={current} floor={floor} onSubmit={handleSubmit} />
          )}
        </Shaft>
      </div>

      <div className="side">
        <Panel floors={floors} current={current} target={target} stage={stage} onPress={press} />
        <p className="status" aria-live="polite">{status}</p>
        <p className="count">Layanan terkirim: {submissions.length}</p>
      </div>
    </section>
  );
}
