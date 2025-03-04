'use client';

import CustomButton from '@/components/ui/button/CustomButton';
import CustomInput from '@/components/ui/input/CustomInput';
import Api from '@/core/api/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginView = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    const emailErrorMsg = email ? '' : 'Поле не заполнено';
    const passwordErrorMsg = password ? '' : 'Поле не заполнено';

    setEmailError(emailErrorMsg);
    setPasswordError(passwordErrorMsg);

    try {
      const result = await Api.post('/auth/login', {
        email,
        password,
      });

      router.push('/');

      console.log(result);
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleGoRegistration = () => {
    router.push('/registration');
  };

  return (
    <div className={'text-black flex w-full h-full items-center'}>
      <div className={'flex flex-col w-full gap-1 text-3xl'}>
        <div className={'mb-6'}>Вход</div>
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
        <CustomButton
          disabled={!!emailError || !!passwordError}
          text={'Войти'}
          onClick={handleLogin}
        />
        <div className={'text-xl text-center mt-2'}>
          Еще нет аккаунта?
          <span
            className={
              'ml-2 text-main-blue cursor-pointer hover:border-main-blue hover:border-b-1'
            }
            onClick={handleGoRegistration}
          >
            Зарегистрироваться
          </span>
        </div>
      </div>
    </div>
  );
};
export default LoginView;
