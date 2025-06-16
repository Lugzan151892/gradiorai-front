export const formatFileSize = (bytes: number): string => {
  const units = [
    { label: 'Tb', size: 1024 ** 4 },
    { label: 'Gb', size: 1024 ** 3 },
    { label: 'Mb', size: 1024 ** 2 },
    { label: 'Kb', size: 1024 },
    { label: 'B', size: 1 },
  ];

  const result: string[] = [];

  for (const unit of units) {
    const amount = Math.floor(bytes / unit.size);
    if (amount > 0) {
      result.push(`${amount} ${unit.label}`);
      bytes %= unit.size;
    }
  }

  return result.join(' ');
};
