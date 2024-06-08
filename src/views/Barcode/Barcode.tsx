import { useState } from 'react';
import { Textarea, Barcode, BarcodeType } from '@/components';
import styles from './code.module.css';

const QRCodeView = () => {
  const [text, setText] = useState('Hello, world!');
  const [type, setType] = useState<BarcodeType>('Code128');
  const [displayValue, setDisplayValue] = useState(true);

  return (
    <div className={styles.code}>
      <h1 className={styles.title}>Generator Barcode code128</h1>
      <div className={styles.container}>
        <div className={styles.item}>
          <label className={styles.label}>Text</label>
          <Textarea
            value={text}
            onChange={event => setText(event.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Display value</label>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={displayValue}
            onChange={e => setDisplayValue(e.target.checked)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Type</label>
          <select
            className={styles.select}
            value={type}
            onChange={e => setType(e.target.value as BarcodeType)}
          >
            <option value="Code128">Code128</option>
            <option value="Code128A">Code128A</option>
            <option value="Code128B">Code128B</option>
            <option value="Code128C">Code128C</option>
          </select>
        </div>
        <div className={styles.result}>
          <Barcode
            value={text}
            type={type}
            displayValue={displayValue}
            className={styles.barcode}
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeView;
