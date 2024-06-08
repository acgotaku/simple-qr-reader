export const SET_A = 0;
export const SET_B = 1;
export const SET_C = 2;

export const SWAP: Record<number, number> = {
  101: SET_A,
  100: SET_B,
  99: SET_C
};

export const START_A = 103;
export const START_B = 104;
export const START_C = 105;

export const MODULO = 103;
export const STOP = 106;
export const FNC1 = 207;

// Get set by start code
export const SET_BY_CODE: Record<number, number> = {
  [START_A]: SET_A,
  [START_B]: SET_B,
  [START_C]: SET_C
};

// ASCII value ranges 0-127, 200-211
export const ALL_CHARS = '[\x00-\x7F\xC8-\xD3]';

// 128A (Code Set A)
// ASCII characters 00 to 95 (0–9, A–Z and control codes), special characters, and FNC 1–4
export const A_CHARS = '[\x00-\x5F\xC8-\xCF]';

// 128B (Code Set B)
// ASCII characters 32 to 127 (0–9, A–Z, a–z), special characters, and FNC 1–4
export const B_CHARS = '[\x20-\x7F\xC8-\xCF]';

// 128C (Code Set C)
// 00–99 (encodes two digits with a single code point) and FNC1
export const C_CHARS = '(\xCF*[0-9]{2}\xCF*)';

export const A_START_CHAR = String.fromCharCode(208); // START_A + 105
export const B_START_CHAR = String.fromCharCode(209); // START_B + 105
export const C_START_CHAR = String.fromCharCode(210); // START_C + 105
