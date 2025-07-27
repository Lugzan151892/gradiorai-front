export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const cbSleep = (callback: () => void, delay: number): void => {
  setTimeout(callback, delay);
};
