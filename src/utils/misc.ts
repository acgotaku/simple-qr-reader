export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const flushPromises = () => sleep(0);

export const base64ToByteArray = (base64: string) => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes: Array<number> = [];
  for (let i = 0; i < len; ++i) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};
