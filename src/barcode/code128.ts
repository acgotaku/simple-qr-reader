import { BarCode, Options } from './barcode';
import {
  SET_A,
  SET_B,
  SWAP,
  SET_BY_CODE,
  MODULO,
  STOP,
  ALL_CHARS,
  A_CHARS,
  B_CHARS,
  C_CHARS,
  A_START_CHAR,
  B_START_CHAR,
  C_START_CHAR
} from './const';

export interface EncodingResult {
  checksum: number;
  result: string;
}

export class Code128 extends BarCode {
  protected givenCharacter = '';

  constructor(options: Options) {
    super(options);
    this.givenCharacter = this.code128Clip();
  }

  valid() {
    return new RegExp(`^${ALL_CHARS}+$`).test(this.value);
  }

  private getCodeValue(): number[] {
    const codes: number[] = [
      11011001100, 11001101100, 11001100110, 10010011000, 10010001100,
      10001001100, 10011001000, 10011000100, 10001100100, 11001001000,
      11001000100, 11000100100, 10110011100, 10011011100, 10011001110,
      10111001100, 10011101100, 10011100110, 11001110010, 11001011100,
      11001001110, 11011100100, 11001110100, 11101101110, 11101001100,
      11100101100, 11100100110, 11101100100, 11100110100, 11100110010,
      11011011000, 11011000110, 11000110110, 10100011000, 10001011000,
      10001000110, 10110001000, 10001101000, 10001100010, 11010001000,
      11000101000, 11000100010, 10110111000, 10110001110, 10001101110,
      10111011000, 10111000110, 10001110110, 11101110110, 11010001110,
      11000101110, 11011101000, 11011100010, 11011101110, 11101011000,
      11101000110, 11100010110, 11101101000, 11101100010, 11100011010,
      11101111010, 11001000010, 11110001010, 10100110000, 10100001100,
      10010110000, 10010000110, 10000101100, 10000100110, 10110010000,
      10110000100, 10011010000, 10011000010, 10000110100, 10000110010,
      11000010010, 11001010000, 11110111010, 11000010100, 10001111010,
      10100111100, 10010111100, 10010011110, 10111100100, 10011110100,
      10011110010, 11110100100, 11110010100, 11110010010, 11011011110,
      11011110110, 11110110110, 10101111000, 10100011110, 10001011110,
      10111101000, 10111100010, 11110101000, 11110100010, 10111011110,
      10111101110, 11101011110, 11110101110, 11010000100, 11010010000,
      11010011100, 1100011101011
    ];
    return codes;
  }

  private getBytes(givenWord: string): number[] {
    const bytes: number[] = [];
    for (let i = 0; i < givenWord.length; i++) {
      bytes.push(givenWord.charCodeAt(i));
    }
    return bytes;
  }

  private check128A(value: string): string {
    const result = value.match(new RegExp(`^${A_CHARS}*`));
    return result ? result[0] : '';
  }
  private check128B(value: string): string {
    const result = value.match(new RegExp(`^${B_CHARS}*`));
    return result ? result[0] : '';
  }
  private check128C(value: string): string {
    const result = value.match(new RegExp(`^${C_CHARS}*`));
    return result ? result[0] : '';
  }

  private clipAB(value: string, code128A: boolean): string {
    const ranges: string = code128A ? A_CHARS : B_CHARS;
    const untilC = value.match(
      new RegExp('^(' + ranges + '+?)(([0-9]{2}){2,})([^0-9]|$)')
    );
    if (untilC) {
      return (
        untilC[1] +
        String.fromCharCode(204) +
        this.clipC(value.substring(untilC[1].length))
      );
    }

    const result = value.match(new RegExp('^' + ranges + '+'));
    const chars = result ? result[0] : '';

    if (chars.length === value.length) {
      return value;
    }
    return value;
  }

  private code128Clip(): string {
    const check128C: number = this.check128C(this.value).length;
    if (check128C >= 2) {
      return C_START_CHAR + this.clipC(this.value);
    } else {
      const code128A: boolean =
        this.check128A(this.value) > this.check128B(this.value);
      return (
        (code128A ? A_START_CHAR : B_START_CHAR) +
        this.clipAB(this.value, code128A)
      );
    }
  }

  private clipC(string: string): string {
    const cMatch: string = this.check128C(string);
    const length: number = cMatch.length;
    if (length === string.length) {
      return string;
    }
    string = string.substring(length);
    const code128A: boolean = this.check128A(string) >= this.check128B(string);
    return (
      cMatch +
      String.fromCharCode(code128A ? 206 : 205) +
      this.clipAB(string, code128A)
    );
  }

  public render() {
    if (this.valid()) {
      const code = this.code128();
      return this.calculateBarCodeAttributes(code);
    } else {
      return [];
    }
  }

  public code128(): string {
    const bytes = this.getBytes(this.givenCharacter);
    const startCharacterValue = (bytes.shift() as number) - 105;
    const set = SET_BY_CODE[startCharacterValue];
    const encodingResult = this.encodeData(bytes, 1, set);
    return this.encode(startCharacterValue, encodingResult);
  }

  private encode(startIndex: number, encodingResult: EncodingResult): string {
    let encodeValue: string = this.getCodes(startIndex) + encodingResult.result;
    if (this.enableCheckSum) {
      encodeValue += this.getCodes(
        (encodingResult.checksum + startIndex) % MODULO
      );
    }
    encodeValue += this.getCodes(STOP);
    return encodeValue;
  }

  private encodeData(
    byteValue: number[],
    textPosition: number,
    set: number
  ): EncodingResult {
    let nextCode: EncodingResult = { result: '', checksum: 0 };
    if (!byteValue.length) {
      return nextCode;
    }
    let index: number;
    if (byteValue[0] >= 200) {
      index = (byteValue.shift() as number) - 105;
      const nextSet = SWAP[index];
      if (nextSet !== undefined) {
        nextCode = this.encodeData(byteValue, textPosition + 1, nextSet);
      }
    } else {
      index = this.correctIndex(byteValue, set);
      nextCode = this.encodeData(byteValue, textPosition + 1, set);
    }
    const encodingValues: string = this.getCodes(index);
    const weight: number = index * textPosition;

    return {
      result: encodingValues + nextCode.result,
      checksum: weight + nextCode.checksum
    };
  }

  // Correct an index by a set and shift it from the bytes array
  private correctIndex(bytes: number[], set?: number): number {
    if (set === SET_A) {
      const charCode = bytes.shift() as number;
      return charCode < 32 ? charCode + 64 : charCode - 32;
    } else if (set === SET_B) {
      return (bytes.shift() as number) - 32;
    } else {
      return (
        ((bytes.shift() as number) - 48) * 10 + (bytes.shift() as number) - 48
      );
    }
  }

  // Get a bar symbol by index
  private getCodes(index: number): string {
    const codes: number[] = this.getCodeValue();
    return codes[index] ? codes[index].toString() : '';
  }
}
