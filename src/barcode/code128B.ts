import { Options } from './barcode';
import { Code128 } from './code128';
import { B_START_CHAR, B_CHARS } from './const';

export class Code128B extends Code128 {
  constructor(options: Options) {
    super(options);
    this.givenCharacter = B_START_CHAR + options.value;
  }

  valid() {
    return new RegExp(`^${B_CHARS}+$`).test(this.value);
  }
}
