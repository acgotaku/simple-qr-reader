import { Options } from './barcode';
import { Code128 } from './code128';
import { C_START_CHAR, C_CHARS } from './const';

export class Code128C extends Code128 {
  constructor(options: Options) {
    super(options);
    this.givenCharacter = C_START_CHAR + options.value;
  }

  valid() {
    return new RegExp(`^${C_CHARS}+$`).test(this.value);
  }
}
