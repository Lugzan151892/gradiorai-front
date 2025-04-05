'use client';

import CustomCodeInput from '@/components/ui/code-input/CustomCodeInput';
import CustomInput from '@/components/ui/input/CustomInput';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import { setUnAuth } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AuthConfirmButton from '@/app/(views)/(auth)/components/AuthConfirmButton';
import routeChecker from '@/hoc/routeChecker';

const RegistrationPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = useState('');
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const handleCheckIsFieldsValid = () => {
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
      return false;
    }

    return true;
  };

  const handleInputCode = (val: string) => {
    setCodeError(false);
    setCode(val);
  };

  const handleRequestCode = async () => {
    if (!handleCheckIsFieldsValid()) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.get('/auth/code-request', { email });
      setShowCodeBlock(true);
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRegister = async () => {
    if (!handleCheckIsFieldsValid()) {
      return;
    }

    try {
      dispatch(setLoading(true));

      const result = await Api.postSilent('/auth/registration', {
        email,
        password,
        repeated_password: repeatedPassword,
        email_code: code,
      });

      if (result.success) {
        dispatch(setUnAuth(false));
        router.push('/');
      } else {
        if (result.payload.type === 'code') {
          setCodeError(true);
        } else if (result.payload.type === 'password') {
          setPasswordError(result.payload.message || '');
        } else if (result.payload.type === 'email') {
          setEmailError(result.payload.message || '');
        } else {
          throw new Error(result.payload.message);
        }
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoLogin = () => {
    router.push('/login');
  };

  const handleGoRestore = () => {
    router.push('/restore-password');
  };

  return (
    <div className={'text-black flex w-full h-full items-center'}>
      <div className={'flex flex-col w-full h-full gap-1 text-3xl'}>
        <div className={'mb-20 text-white text-center'}>Добро пожаловать!</div>
        <CustomInput
          className={'mb-6'}
          value={email}
          error={emailError}
          placeholder={'Email'}
          icon={'email'}
          onInput={(val) => {
            setEmail(val);
            setEmailError('');
          }}
        />
        <CustomInput
          className={'mb-6'}
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
        <CustomInput
          type={'password'}
          icon={'password'}
          placeholder={'Повторите пароль'}
          value={repeatedPassword}
          error={repeatedPasswordError}
          onInput={(val) => {
            setRepeatedPassword(val);
            setRepeatedPasswordError('');
          }}
        />
        <div className={'grow'} />
        {showCodeBlock && (
          <div className={'flex flex-col text-center'}>
            <div className={'text-white text-xl mb-2'}>Подтвердите Email</div>
            <div className={'text-white text-sm mb-5'}>Код отправлен на адрес {email}</div>
            <CustomCodeInput
              className={'mx-auto rounded-input'}
              error={codeError}
              value={code}
              onInput={handleInputCode}
            />
          </div>
        )}
        <AuthConfirmButton
          className={'!w-[170px] mx-auto mt-2'}
          disabled={
            !!emailError ||
            !!passwordError ||
            !!repeatedPasswordError ||
            (showCodeBlock && (code.length < 4 || codeError))
          }
          icon={'check'}
          size={36}
          text={'Создать'}
          onClick={showCodeBlock ? handleRegister : handleRequestCode}
        />
        <div className={'flex text-base w-full items-center justify-center mt-3'}>
          {showCodeBlock ? (
            <div
              className={'text-white cursor-pointer border-b-1 border-transparent hover:border-white hover:border-b-1'}
              onClick={handleRequestCode}
            >
              Отправить повторно?
            </div>
          ) : (
            <>
              <span
                className={
                  'ml-2 text-white cursor-pointer border-b-1 border-transparent hover:border-white hover:border-b-1'
                }
                onClick={handleGoLogin}
              >
                Вход
              </span>
              <span
                className={
                  'ml-5 text-white cursor-pointer border-b-1 border-transparent hover:border-white hover:border-b-1'
                }
                onClick={handleGoRestore}
              >
                Забыли пароль?
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default routeChecker(RegistrationPage, 'guestOnly');
