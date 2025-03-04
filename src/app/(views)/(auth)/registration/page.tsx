'use client';

import CustomButton from '@/components/ui/button/CustomButton';
import CustomInput from '@/components/ui/input/CustomInput';
import Api from '@/core/api/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RegistrationPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = useState('');

  const handleRegister = async () => {
    const emailErrorMsg = email ? '' : 'Поле не заполнено';
    const passwordErrorMsg = password ? '' : 'Поле не заполнено';
    const repeatedPasswordErrorMsg = repeatedPassword
      ? ''
      : 'Поле не заполнено';

    const passwordMismatchError =
      password !== repeatedPassword ? 'Пароли не совпадают' : '';

    if (emailErrorMsg || passwordErrorMsg || repeatedPasswordErrorMsg) {
      setEmailError(emailErrorMsg);
      setPasswordError(passwordErrorMsg);
      setRepeatedPasswordError(
        passwordMismatchError || repeatedPasswordErrorMsg
      );

      return;
    }

    try {
      const result = await Api.post('/auth/registration', {
        email,
        password,
        repeated_password: repeatedPassword,
      });

      router.push('/');

      console.log(result);
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleGoLogin = () => {
    router.push('/login');
  };

  return (
    <div className={'text-black flex w-full h-full items-center'}>
      <div className={'flex flex-col w-full gap-1 text-3xl'}>
        <div className={'mb-6'}>Регистрация</div>
        <CustomInput
          validation
          value={email}
          error={emailError}
          onInput={(val) => {
            setEmail(val);
            setEmailError('');
          }}
        />
        <CustomInput
          validation
          value={password}
          error={passwordError}
          onInput={(val) => {
            setPassword(val);
            setPasswordError('');
          }}
        />
        <CustomInput
          validation
          value={repeatedPassword}
          error={repeatedPasswordError}
          onInput={(val) => {
            setRepeatedPassword(val);
            setRepeatedPasswordError('');
          }}
        />
        <CustomButton
          disabled={!!emailError || !!passwordError || !!repeatedPasswordError}
          text={'Зарегистрироваться'}
          onClick={handleRegister}
        />
        <div className={'text-xl text-center mt-2'}>
          Уже есть аккаунт?{' '}
          <span
            className={
              'text-main-blue cursor-pointer hover:border-main-blue hover:border-b-1'
            }
            onClick={handleGoLogin}
          >
            Войти
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
