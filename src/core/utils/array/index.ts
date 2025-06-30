export const shuffleArray = (array: Array<any>) => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    // Генерация случайного индекса
    const j = Math.floor(Math.random() * (i + 1));

    // Обмен элементов
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getRandomElement = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
