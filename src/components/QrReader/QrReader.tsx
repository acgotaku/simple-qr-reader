import React, { useEffect, useRef, memo } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import cls from 'clsx';
import { IQrReaderProps } from './QrReader.types';
import { ViewFinder } from './ViewFinder';
import styles from './reader.module.css';
import message from '../message';
const defaultConstraints = {
  facingMode: 'environment'
};

const QrReader: React.FC<IQrReaderProps> = ({
  scanDelay = 500,
  constraints = defaultConstraints,
  className = '',
  onResult
}) => {
  const stopRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const codeReader = new BrowserQRCodeReader();
      stopRef.current = false;
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: constraints
        })
        .then(stream => {
          if (videoRef.current && !videoRef.current.srcObject) {
            streamRef.current = stream;
            videoRef.current.srcObject = stream;
            videoRef.current.setAttribute('playsinline', '');
            videoRef.current.play();
            codeReader
              .decodeFromVideoElement(
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
        })
        .catch(err => {
          message.error(err.message);
        });
    }

    return () => {
      stopRef.current = true;
      // stop the video
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [scanDelay, constraints, onResult]);

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
