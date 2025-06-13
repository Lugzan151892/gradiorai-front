import React from 'react';
interface ICustomRadioButtonProps {
  caption?: string;
  selected?: boolean;
  noPointer?: boolean;
  disabled?: boolean;
  textLarge?: boolean;
  type?: 'success' | 'error';
  onClick?: () => void;
}

const CustomRadioButton: React.FC<ICustomRadioButtonProps> = ({
  caption,
  selected,
  noPointer,
  disabled,
  type,
  textLarge,
  onClick,
}) => {
  const disabledClasses = disabled ? 'opacity-40 cursor-default' : '';

  const getPointerMarkup = () => {
    if (type === 'success') {
      return (
        <div
          className={
            'rounded-full shrink-0 h-5 w-5 bg-success flex items-center justify-center shadow-default shadow-black'
          }
        >
          ✔
        </div>
      );
    }

    if (type === 'error') {
      return (
        <div
          className={
            'rounded-full shrink-0 h-5 w-5 bg-error flex items-center justify-center shadow-default shadow-black'
          }
        >
          x
        </div>
      );
    }

    return <div className={'rounded-full shrink-0 bg-gray h-2 w-2'} />;
  };

  return (
    <div className={`flex items-center w-full py-1 ${noPointer ? '' : 'cursor-pointer'} ${disabledClasses}`}>
      <div
        className={
          'border border-gray rounded-full bg-white shrink-0 h-4 w-4 flex items-center justify-center shadow-2xl'
        }
        onClick={onClick}
      >
        {selected ? getPointerMarkup() : null}
      </div>
      {caption ? (
        <div className={`ml-4 text-white ${textLarge ? 'text-xl mobile:text-sm' : 'text-sm'}`}> {caption} </div>
      ) : null}
    </div>
  );
};

export default CustomRadioButton;
