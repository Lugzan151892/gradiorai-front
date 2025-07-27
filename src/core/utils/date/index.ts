export const defaultDateMask = 'DD.MM.YYYY HH:mm:ss';

export const normalizeServerDate = (val: string, mask?: string) => {
  const date = new Date(val);

  const userMask = mask || defaultDateMask;

  const formatted = date.toLocaleString('ru-RU', {
    ...(userMask.includes('DD') ? { day: '2-digit' } : {}),
    ...(userMask.includes('MM') ? { month: '2-digit' } : {}),
    ...(userMask.includes('YYYY') ? { year: 'numeric' } : {}),
    ...(userMask.includes('HH') ? { hour: '2-digit' } : {}),
    ...(userMask.includes('mm') ? { minute: '2-digit' } : {}),
    ...(userMask.includes('ss') ? { second: '2-digit' } : {}),
  });

  return formatted;
};
