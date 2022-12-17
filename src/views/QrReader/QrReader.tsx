import { useState } from 'react';
import { Button, QrReader, message } from '@/components';
import styles from './reader.module.css';

const QrReaderView = () => {
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState('');

  return (
    <div className={styles.reader}>
      <h1 className={styles.title}>QR Reader</h1>
      <div className={styles.container}>
        <Button onClick={() => setVisible(visible => !visible)}>
          {visible ? 'Stop scan' : 'scan QR code'}
        </Button>
        {visible && (
          <QrReader
            className={styles.qr}
            onResult={(result, error) => {
              if (result) {
                setResult(result?.getText());
              }
              if (error?.message) {
                message.error(error.message);
              }
            }}
          />
        )}
        <p className={styles.result}>Result: {result}</p>
      </div>
    </div>
  );
};

export default QrReaderView;
