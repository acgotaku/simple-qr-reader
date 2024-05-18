import React, { useMemo } from 'react';
import qrcodegen from '@/vendors/qrcode/qrcodegen';
import { base64ToByteArray } from '@/utils/misc';
import { IQRCodeProps } from './QRCode.types';

const lightColor = '#fff';
const darkColor = '#000';

const QRC = qrcodegen.QrCode;

const ERROR_LEVEL_MAP: { [index: string]: qrcodegen.QrCode.Ecc } = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH
};

const QRCode: React.FC<IQRCodeProps> = ({
  payload = '',
  base64Encoded = false,
  border = 4,
  property = {},
  ...rest
}) => {
  const qr = useMemo(() => {
    const { version, level = 'M', mask = -1 } = property;
    try {
      if (base64Encoded) {
        if (version) {
          return QRC.encodeBinaryWithVersion(
            base64ToByteArray(payload),
            ERROR_LEVEL_MAP[level],
            version,
            mask
          );
        } else {
          return QRC.encodeBinary(
            base64ToByteArray(payload),
            ERROR_LEVEL_MAP[level]
          );
        }
      } else {
        if (version) {
          return QRC.encodeTextWithVersion(
            payload,
            ERROR_LEVEL_MAP[level],
            version,
            mask
          );
        } else {
          return QRC.encodeText(payload, ERROR_LEVEL_MAP[level]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [payload, base64Encoded, property]);

  const path = useMemo(() => {
    const parts: Array<string> = [];
    if (qr) {
      for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
          if (qr.getModule(x, y))
            parts.push(`M${x + border},${y + border}h1v1h-1z`);
        }
      }
    }
    return parts.join(' ');
  }, [qr, border]);

  return (
    <>
      {qr && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${qr.size + border * 2} ${qr.size + border * 2}`}
          stroke="none"
          {...rest}
        >
          <rect width="100%" height="100%" fill={lightColor} />
          <path d={path} fill={darkColor} />
        </svg>
      )}
    </>
  );
};

export default QRCode;
