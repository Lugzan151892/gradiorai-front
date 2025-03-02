import React from 'react';
interface ICustomRadioButtonProps {
  caption?: string;
  selected?: boolean;
  noPointer?: boolean;
  onClick?: () => void;
}

const CustomRadioButton: React.FC<ICustomRadioButtonProps> = ({
  caption,
  selected,
  noPointer,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center w-full py-1 ${noPointer ? '' : 'cursor-pointer'}`}
    >
      <div
        className={
          'border-1 border-gray rounded-full bg-white h-4 w-4 flex items-center justify-center shadow-2xl'
        }
        onClick={onClick}
      >
        {selected ? <div className={'rounded-full bg-gray h-2 w-2'} /> : null}
      </div>
      {caption ? <div className={'ml-4 text-black'}> {caption} </div> : null}
    </div>
  );
};

export default CustomRadioButton;
