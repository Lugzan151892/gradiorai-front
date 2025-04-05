import React from 'react';
import CustomButton from '@/components/ui/button/CustomButton';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import styles from '@/app/(views)/(auth)/components/styles/AuthConfirmButton.module.css';

const AuthConfirmButton: React.FC<{
  text?: string;
  className?: string;
  icon: 'check' | 'open-password' | 'refresh';
  size?: number;
  customBorder?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ text = '', className = '', disabled, icon, size, customBorder, onClick }) => {
  return (
    <CustomButton
      className={'!rounded-input !px-0 !py-0 text-xl ' + className}
      text={text}
      disabled={disabled}
      color={'low-green'}
      onClick={onClick}
    >
      {customBorder ? (
        <div className={'flex items-center justify-end w-full relative text-center'}>
          <div className={styles.text}>{text}</div>
          <div className={'h-9 w-9 flex items-center justify-center border-2 border-white rounded-full'}>
            <CustomIcon
              name={icon}
              color={'var(--main-white)'}
              size={size}
            />
          </div>
        </div>
      ) : (
        <div className={'flex items-center justify-end w-full relative text-center'}>
          <div className={styles.text}>{text}</div>
          <CustomIcon
            name={icon}
            color={'var(--main-white)'}
            size={size}
          />
        </div>
      )}
    </CustomButton>
  );
};

export default AuthConfirmButton;
