import { useMemo, useState } from 'react';
import { Textarea, QRCode } from '@/components';
import styles from './code.module.css';

const QRCodeView = () => {
  const [text, setText] = useState('Hello, world!');
  const [base64Data, setBase64Data] = useState(false);
  const [level, setLevel] = useState('M');
  const [version, setVersion] = useState('12');
  const [autoVersion, setAutoVersion] = useState(true);
  const [mask, setMask] = useState('-1');

  const property = useMemo(() => {
    return {
      version: Number(version),
      level,
      mask: Number(mask)
    };
  }, [version, level, mask]);
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
          <label className={styles.label}>Base64 data</label>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={base64Data}
            onChange={e => setBase64Data(e.target.checked)}
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
          <label className={styles.label}>Auto version</label>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={autoVersion}
            onChange={e => setAutoVersion(e.target.checked)}
          />
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
            disabled={autoVersion}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Mask</label>
          <input
            value={mask}
            className={styles.input}
            onChange={e => setMask(e.target.value)}
            type="number"
            min={-1}
            max={7}
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
