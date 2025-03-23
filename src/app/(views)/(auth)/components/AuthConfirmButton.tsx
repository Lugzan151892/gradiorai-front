import React from 'react';
import CustomButton from '@/components/ui/button/CustomButton';
import CustomIcon from '@/components/ui/icon/CustomIcon';

const AuthConfirmButton: React.FC<{
  text?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ text = '', className = '', disabled, onClick }) => {
  return (
    <CustomButton
      className={'!rounded-input ' + className}
      text={text}
      disabled={disabled}
      color={'low-green'}
      onClick={onClick}
    >
      <div className={'flex items-between w-full'}>
        <div>{text}</div>
        <CustomIcon
          name={'check'}
          stroke={'var(--main-white)'}
          fill={'transparent'}
          size={36}
        />
      </div>
    </CustomButton>
  );
};

export default AuthConfirmButton;
