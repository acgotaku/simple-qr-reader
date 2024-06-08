import React, { useMemo } from 'react';
import { Code128, Code128A, Code128B, Code128C } from '@/barcode';
import { IBarCodeProps, BAR_CODE_TYPE } from './Barcode.types';

const BarCode: React.FC<IBarCodeProps> = ({
  value,
  type = BAR_CODE_TYPE.CODE128,
  width = 2,
  height = 100,
  displayValue = true,
  enableCheckSum = true,
  ...rest
}) => {
  const attrs = useMemo(() => {
    const options = { value, width, height, displayValue, enableCheckSum };
    switch (type) {
      case BAR_CODE_TYPE.CODE128: {
        const code128 = new Code128(options);
        return code128.render();
      }
      case BAR_CODE_TYPE.CODE128A: {
        const code128 = new Code128A(options);
        return code128.render();
      }
      case BAR_CODE_TYPE.CODE128B: {
        const code128 = new Code128B(options);
        return code128.render();
      }
      case BAR_CODE_TYPE.CODE128C: {
        const code128 = new Code128C(options);
        return code128.render();
      }
      default: {
        const code128 = new Code128(options);
        return code128.render();
      }
    }
  }, [value, type, width, height, displayValue, enableCheckSum]);

  const svgWidth = useMemo(() => {
    const lastAttr = attrs[attrs.length - 1];
    return lastAttr ? lastAttr.x + lastAttr.width : 0;
  }, [attrs]);

  const svgHeight = useMemo(() => {
    return displayValue ? Number(height) + 28 : Number(height);
  }, [displayValue, height]);

  const textY = useMemo(() => {
    return Number(height) + 24;
  }, [height]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      stroke="none"
      {...rest}
    >
      {attrs.map((attr, index) => (
        <rect key={index} {...attr} />
      ))}
      {displayValue && (
        <text
          x={svgWidth / 2}
          y={textY}
          textAnchor="middle"
          style={{ font: '20px monospace' }}
        >
          {value}
        </text>
      )}
    </svg>
  );
};

export default BarCode;
