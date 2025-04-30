import React from 'react';

const CustomInpuButton: React.FC<
  Readonly<{
    text: string;
    selected?: boolean;
    onClick?: () => void;
  }>
> = ({ selected, text, onClick }) => {
  const selectedClasses = selected
    ? 'bg-low-green border-low-green'
    : 'hover:text-low-green hover:text-low-green hover:border-low-green';
  return (
    <div
      className={
        'py-1 desktop:px-8 mobile:px-5 rounded-input border-1 max-w-max desktop:text-2xl mobile:text-base cursor-pointer ' +
        selectedClasses
      }
      onClick={onClick}
    >
      <div>{text}</div>
    </div>
  );
};

export default CustomInpuButton;
