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
    };
  }, [scanDelay, constraints, onResult]);

  // const scan = useCallback(async () => {
  //   const canvas = document.createElement('canvas');
  //   const video = videoRef.current;
  //   if (video) {
  //     const width = video.videoWidth;
  //     const height = video.videoHeight;
  //     canvas.width = width;
  //     canvas.height = height;
  //     const ctx = canvas.getContext('2d');
  //     if (ctx && width && height) {
  //       ctx.drawImage(video, 0, 0, width, height);
  //       const result = codeReader.decodeFromCanvas(canvas);
  //       console.log(result);
  //       // if (result.length > 0) {
  //       //   setShowReader(false);
  //       //   onResult?.(result[0]?.decode());
  //       //   window.clearInterval(intervalRef.current);
  //       //   video.pause();
  //       //   if (video.srcObject) {
  //       //     (video.srcObject as MediaStream)
  //       //       .getVideoTracks()
  //       //       .forEach(track => track.stop());
  //       //     video.srcObject = null;
  //       //   }
  //       // }
  //     }
  //   }
  // }, [onResult]);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     intervalRef.current = window.setInterval(() => {
  //       scan();
  //     }, scanDelay);
  //   }
  //   return () => {
  //     window.clearInterval(intervalRef.current);
  //   };
  // }, [scanDelay, scan]);
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
