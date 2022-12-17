import React, { useEffect, useRef, memo } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import cls from 'clsx';
import { IQrReaderProps } from './QrReader.types';
import { ViewFinder } from './ViewFinder';
import styles from './reader.module.css';

const QrReader: React.FC<IQrReaderProps> = ({
  videoId = 'video',
  scanDelay = 500,
  constraints = {
    facingMode: 'environment'
  },
  className = '',
  onResult
}) => {
  const stopRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const codeReader = new BrowserQRCodeReader(undefined, {
        delayBetweenScanAttempts: scanDelay
      });
      stopRef.current = false;
      codeReader
        .decodeFromConstraints(
          {
            video: constraints
          },
          videoRef.current,
          (result, error, controls) => {
            onResult && onResult(result, error, controls);
            if (stopRef.current) {
              controls.stop();
            }
          }
        )
        .catch(error => {
          onResult && onResult(undefined, error);
        });
    }
    return () => {
      stopRef.current = true;
    };
  }, [videoId, scanDelay, constraints, onResult]);
  return (
    <section className={cls(styles.reader, className)}>
      <div className={styles.container}>
        <ViewFinder />
        <video
          muted
          ref={videoRef}
          className={styles.video}
          style={{
            transform:
              constraints?.facingMode === 'user' ? 'scaleX(-1)' : 'none'
          }}
        />
      </div>
    </section>
  );
};

export default memo(QrReader);
