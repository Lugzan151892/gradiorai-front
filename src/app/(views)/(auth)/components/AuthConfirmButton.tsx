import React from 'react';
import CustomButton from '@/components/ui/button/CustomButton';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import styles from '@/app/(views)/(auth)/components/styles/AuthConfirmButton.module.css';

const AuthConfirmButton: React.FC<{
  text?: string;
  className?: string;
  icon: 'check' | 'password';
  disabled?: boolean;
  onClick?: () => void;
}> = ({ text = '', className = '', disabled, icon, onClick }) => {
  return (
    <CustomButton
      className={'!rounded-input !px-0 !py-0 ' + className}
      text={text}
      disabled={disabled}
      color={'low-green'}
      onClick={onClick}
    >
      {icon === 'password' ? (
        <div className={'flex items-center justify-end w-full relative text-center'}>
          <div className={styles.text}>{text}</div>
          <div className={'h-9 w-9 flex items-center justify-center border-2 border-white rounded-full'}>
            <CustomIcon
              name={'open-password'}
              stroke={'var(--main-white)'}
              fill={'transparent'}
              size={16}
            />
          </div>
        </div>
      ) : (
        <div className={'flex items-center justify-end w-full relative text-center'}>
          <div className={styles.text}>{text}</div>
          <CustomIcon
            name={icon}
            stroke={'var(--main-white)'}
            fill={'transparent'}
            size={36}
          />
        </div>
      )}
    </CustomButton>
  );
};

export default AuthConfirmButton;
