import React from 'react';
interface ICustomRadioButtonProps {
  caption?: string;
  selected?: boolean;
  noPointer?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const CustomRadioButton: React.FC<ICustomRadioButtonProps> = ({ caption, selected, noPointer, disabled, onClick }) => {
  const disabledClasses = disabled ? 'opacity-40 cursor-default' : '';

  return (
    <div className={`flex items-center w-full py-1 ${noPointer ? '' : 'cursor-pointer'} ${disabledClasses}`}>
      <div
        className={
          'border-1 border-gray rounded-full bg-white flex-shrink-0 h-4 w-4 flex items-center justify-center shadow-2xl'
        }
        onClick={onClick}
      >
        {selected ? <div className={'rounded-full flex-shrink-0 bg-gray h-2 w-2'} /> : null}
      </div>
      {caption ? <div className={'ml-4 text-black text-sm'}> {caption} </div> : null}
    </div>
  );
};

export default CustomRadioButton;
