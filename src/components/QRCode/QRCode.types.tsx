export interface QRCodeProperty {
  version?: number;
  level?: string;
  mask?: number;
}

export interface IQRCodeProps extends React.SVGAttributes<SVGElement> {
  payload?: string;
  base64Encoded?: boolean;
  property?: QRCodeProperty;
  border?: number;
}
