'use client';

import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import routeChecker from '@/hoc/routeChecker';
import { useAppDispatch } from '@/hooks/redux';
import { setUnAuth } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import UIButton from '@/components/ui/button/UIButton';
import UIInput from '@/components/ui/input/UIInput';

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

    if (emailErrorMsg || passwordErrorMsg) {
      return;
    }

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

  const forgetPasswordMarkup = (
    <div
      className={'mt-2 text-main-purple text-xs cursor-pointer hover:underline'}
      onClick={handleRestorePassword}
    >
      Забыли пароль?
    </div>
  );

  return (
    <div className={'text-black flex flex-col w-full h-full items-center mx-4'}>
      <div className={'mb-16 text-white text-center text-3xl sm:text-5xl font-bold'}>С возвращением!</div>
      <div className={'w-full max-w-xs'}>
        <UIInput
          className={'mb-3'}
          label={'E-mail'}
          value={email}
          id={'email'}
          error={emailError}
          type={'email'}
          placeholder={'Email'}
          onInput={(val) => {
            setEmail(val);
            setEmailError('');
          }}
        />
        <UIInput
          label={'Пароль'}
          type={'password'}
          id={'password'}
          placeholder={'Пароль'}
          value={password}
          error={passwordError}
          linkChild={forgetPasswordMarkup}
          onInput={(val) => {
            setPassword(val);
            setPasswordError('');
          }}
        />
        <UIButton
          className={'w-full mt-6'}
          disabled={!!emailError || !!passwordError}
          text={'ВОЙТИ'}
          onClick={handleLogin}
          iconAfter={'arrow-top-right'}
        />
        <div className={'flex'}>
          <UIButton
            className={'mt-6 mx-auto'}
            text={'Регистрация'}
            type={'transparent'}
            onClick={handleGoRegistration}
            iconBefore={'user-add'}
          />
        </div>
      </div>
    </div>
  );
};
export default routeChecker(LoginView, 'guestOnly');
