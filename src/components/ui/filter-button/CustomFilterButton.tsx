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
      className={'py-1 px-8 rounded-input border-1 max-w-max text-2xl cursor-pointer ' + selectedClasses}
      onClick={onClick}
    >
      <div>{text}</div>
    </div>
  );
};

export default CustomInpuButton;
