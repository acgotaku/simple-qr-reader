import { useMemo, useState } from 'react';
import { Textarea, QRCode } from '@/components';
import styles from './code.module.css';

const QRCodeView = () => {
  const [text, setText] = useState('Hello, world!');
  const [level, setLevel] = useState('Q');
  const [version, setVersion] = useState('12');

  const property = useMemo(() => {
    return {
      version: Number(version),
      level
    };
  }, [version, level]);
  return (
    <div className={styles.code}>
      <h1 className={styles.title}>Generator QR code</h1>
      <div className={styles.container}>
        <div className={styles.item}>
          <label className={styles.label}>Text</label>
          <Textarea
            value={text}
            onChange={event => setText(event.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Level</label>
          <select
            className={styles.select}
            value={level}
            onChange={e => setLevel(e.target.value)}
          >
            <option value="L">LOW</option>
            <option value="M">MEDIUM</option>
            <option value="Q">QUARTILE</option>
            <option value="H">HIGH</option>
          </select>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Version</label>
          <input
            value={version}
            className={styles.input}
            onChange={e => setVersion(e.target.value)}
            type="number"
            min={1}
            max={40}
          />
        </div>
        <div className={styles.item}>
          <QRCode text={text} property={property} className={styles.qr} />
        </div>
      </div>
    </div>
  );
};

export default QRCodeView;
