import { Exception, Result } from '@zxing/library';
import { IScannerControls } from '@zxing/browser';

export type OnResultFunction = (
  result?: Result,
  error?: Exception,
  codeReader?: IScannerControls
) => void;

export interface IQrReaderProps {
  videoId?: string;
  scanDelay?: number;
  constraints?: MediaTrackConstraints;
  className?: string;
  onResult?: OnResultFunction;
}
