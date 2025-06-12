'use client';

import CustomInput from '@/components/ui/input/CustomInput';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import routeChecker from '@/hoc/routeChecker';
import { useAppDispatch } from '@/hooks/redux';
import { setUnAuth } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import UIButton from '@/components/ui/button/UIButton';

const LoginView = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const emailErrorMsg = email ? '' : 'Поле не заполнено';
    const passwordErrorMsg = password ? '' : 'Поле не заполнено';

    setEmailError(emailErrorMsg);
    setPasswordError(passwordErrorMsg);

    // if (emailErrorMsg || passwordErrorMsg) {
    //   return;
    // }

    try {
      const result = await Api.postSilent('/auth/login', {
        email,
        password,
      });

      if (result.success) {
        dispatch(setUnAuth(false));
        router.push('/');
      } else {
        if (result.payload.type === 'email') {
          setEmailError(result.payload.message || '');
        } else if (result.payload.type === 'password') {
          setPasswordError(result.payload.message || '');
        } else {
          throw new Error(result.payload.message);
        }
      }
    } catch (e) {
      errorHandler(e, dispatch);
    }
  };

  const handleGoRegistration = () => {
    router.push('/registration');
  };
  const handleRestorePassword = () => {
    router.push('/restore-password');
  };

  return (
    <div className={'text-black flex w-full h-full items-center'}>
      <div className={'flex flex-col w-full h-full gap-1 text-3xl'}>
        <div className={'mb-20 text-white text-center'}>С возвращением!</div>
        <CustomInput
          className={'mb-6'}
          value={email}
          error={emailError}
          type={'email'}
          placeholder={'Email'}
          icon={'email'}
          onInput={(val) => {
            setEmail(val);
            setEmailError('');
          }}
        />
        <CustomInput
          type={'password'}
          icon={'password'}
          placeholder={'Пароль'}
          value={password}
          error={passwordError}
          onInput={(val) => {
            setPassword(val);
            setPasswordError('');
          }}
        />
        <div className={'grow'} />
        <UIButton
          className={'w-[170px]! mx-auto'}
          disabled={!!emailError || !!passwordError}
          text={'Войти'}
          onClick={handleLogin}
        />
        <div className={'flex text-base w-full items-center justify-center mt-3'}>
          <span
            className={'ml-2 text-white cursor-pointer border-b border-transparent hover:border-white hover:border-b'}
            onClick={handleGoRegistration}
          >
            Регистрация
          </span>
          <span
            className={'ml-5 text-white cursor-pointer border-b border-transparent hover:border-white hover:border-b'}
            onClick={handleRestorePassword}
          >
            Забыли пароль?
          </span>
        </div>
      </div>
    </div>
  );
};
export default routeChecker(LoginView, 'guestOnly');
