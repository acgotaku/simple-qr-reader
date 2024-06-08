import { BarcodeType } from '@/barcode';

export type { BarcodeType };
export interface IBarCodeProps extends React.SVGAttributes<SVGElement> {
  value: string;
  type?: BarcodeType;
  width?: string | number;
  height?: string | number;
  displayValue?: boolean;
  enableCheckSum?: boolean;
}

export const BAR_CODE_TYPE = {
  CODE128: 'Code128',
  CODE128A: 'Code128A',
  CODE128B: 'Code128B',
  CODE128C: 'Code128C'
};
