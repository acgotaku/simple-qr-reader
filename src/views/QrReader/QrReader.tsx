import { Button, message } from '@/components';
import styles from './reader.module.css';

const QrReaderView = () => {
  return (
    <div className={styles.reader}>
      <h1 className={styles.title}>QR Reader</h1>
      <div className={styles.container}>
        <Button onClick={() => message.error('show code')}>scan QR code</Button>
      </div>
    </div>
  );
};

export default QrReaderView;
