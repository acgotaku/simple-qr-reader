export type BarcodeType = 'Code128' | 'Code128A' | 'Code128B' | 'Code128C';

export type Options = {
  value: string;
  type?: BarcodeType;
  width?: string | number;
  height?: string | number;
  displayValue?: boolean;
  enableCheckSum?: boolean;
};

export interface BaseAttributes {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  string?: string;
  stringSize?: number;
  fontStyle?: string;
  id?: string;
  strokeColor?: string;
}

export class BarCode {
  public value: string;
  public type: BarcodeType;
  public width: string | number;
  public height: string | number;
  public displayValue: boolean;
  public enableCheckSum: boolean;

  constructor(options: Options) {
    const {
      value,
      type = 'Code128',
      width = 2,
      height = 100,
      displayValue = true,
      enableCheckSum = true
    } = options;
    this.value = value;
    this.type = type;
    this.width = width;
    this.height = height;
    this.displayValue = displayValue;
    this.enableCheckSum = enableCheckSum;
  }

  public calculateBarCodeAttributes(binary: string): BaseAttributes[] {
    const attrs: BaseAttributes[] = [];
    let x = 0;
    const y = 0;
    const height = Number(this.height);
    const width = Number(this.width);

    let barWidth = 0;
    binary.split('').forEach(bit => {
      if (bit === '1') {
        barWidth++;
      } else if (barWidth > 0) {
        attrs.push({
          x: x - width * barWidth,
          y,
          width: width * barWidth,
          height: height
        });
        barWidth = 0;
      }
      x += width;
    });
    if (barWidth > 0) {
      attrs.push({
        x: x - width * barWidth,
        y,
        width: width * barWidth,
        height: height
      });
    }
    return attrs;
  }
}
