export interface QRCodeProperty {
  version: number;
  level: string;
  mask: number;
}

export interface IQRCodeProps extends React.SVGAttributes<SVGElement> {
  text?: string;
  property?: QRCodeProperty;
  border?: number;
}
