'use client';

import CustomButton from '@/components/ui/button/CustomButton';
import CustomInput from '@/components/ui/input/CustomInput';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import { setUnAuth } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RegistrationPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = useState('');

  const handleRegister = async () => {
    const emailErrorMsg = email ? '' : 'Поле не заполнено';
    const emailRegError = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? '' : 'Некорректный формат';
    const passwordErrorMsg = password ? '' : 'Поле не заполнено';
    const passwordReqError = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password)
      ? ''
      : 'Пароль должен содержать минимум 8 символов, заглавную букву и спецсимвол';
    const repeatedPasswordErrorMsg = repeatedPassword ? '' : 'Поле не заполнено';

    const passwordMismatchError = password !== repeatedPassword ? 'Пароли не совпадают' : '';

    if (emailErrorMsg || passwordErrorMsg || repeatedPasswordErrorMsg || emailRegError || passwordReqError) {
      setEmailError(emailErrorMsg || emailRegError);
      setPasswordError(passwordErrorMsg || passwordReqError);
      setRepeatedPasswordError(passwordMismatchError || repeatedPasswordErrorMsg);

      return;
    }

    try {
      dispatch(setLoading(true));

      await Api.post('/auth/registration', {
        email,
        password,
        repeated_password: repeatedPassword,
      });

      dispatch(setUnAuth(false));

      router.push('/');
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoLogin = () => {
    router.push('/login');
  };

  return (
    <div className={'text-black flex w-full h-full items-center'}>
      <div className={'flex flex-col w-full gap-1 text-3xl'}>
        <div className={'mb-6 text-text-gray text-center'}>Регистрация</div>
        <CustomInput
          label={'E-mail'}
          validation
          value={email}
          error={emailError}
          onInput={(val) => {
            setEmail(val);
            setEmailError('');
          }}
        />
        <CustomInput
          label={'Пароль'}
          validation
          value={password}
          error={passwordError}
          onInput={(val) => {
            setPassword(val);
            setPasswordError('');
          }}
        />
        <CustomInput
          label={'Повторите пароль'}
          validation
          value={repeatedPassword}
          error={repeatedPasswordError}
          onInput={(val) => {
            setRepeatedPassword(val);
            setRepeatedPasswordError('');
          }}
        />
        <div className={'flex text-base w-full items-center justify-center'}>
          <span
            className={'ml-2 text-main-blue cursor-pointer'}
            onClick={handleGoLogin}
          >
            Вход
          </span>
        </div>
        <CustomButton
          disabled={!!emailError || !!passwordError || !!repeatedPasswordError}
          type={'success'}
          text={'Создать'}
          onClick={handleRegister}
        />
      </div>
    </div>
  );
};

export default RegistrationPage;
