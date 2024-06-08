import { Options } from './barcode';
import { Code128 } from './code128';
import { A_START_CHAR, A_CHARS } from './const';

export class Code128A extends Code128 {
  constructor(options: Options) {
    super(options);
    this.givenCharacter = A_START_CHAR + options.value;
  }

  valid() {
    return new RegExp(`^${A_CHARS}+$`).test(this.value);
  }
}
