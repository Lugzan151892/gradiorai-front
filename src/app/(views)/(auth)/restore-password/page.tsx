'use client';

import CustomCodeInput from '@/components/ui/code-input/CustomCodeInput';
import CustomInput from '@/components/ui/input/CustomInput';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AuthConfirmButton from '../components/AuthConfirmButton';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { openModal } from '@/store/tech/techSlice';
import routeChecker from '@/hoc/routeChecker';

const RestorePassword = () => {
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
  const [step, setStep] = useState<1 | 2>(1);

  const handleInputCode = async (val: string) => {
    setCodeError(false);
    setCode(val);
    if (val.length === 4) {
      await handleCheckCode(val);
    }
  };

  const handleRequestCode = async () => {
    const emailErrorMsg = email ? '' : 'Поле не заполнено';
    const emailRegError = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? '' : 'Некорректный формат';

    if (emailErrorMsg || emailRegError) {
      setEmailError(emailErrorMsg || emailRegError);
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.get('/auth/restore-code-request', { email });
      setShowCodeBlock(true);
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSetPassword = async () => {
    const passwordErrorMsg = password ? '' : 'Поле не заполнено';
    const passwordReqError = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password)
      ? ''
      : 'Пароль должен содержать минимум 8 символов, заглавную букву и спецсимвол';
    const repeatedPasswordErrorMsg = repeatedPassword ? '' : 'Поле не заполнено';
    const passwordMismatchError = password !== repeatedPassword ? 'Пароли не совпадают' : '';

    if (passwordErrorMsg || repeatedPasswordErrorMsg || passwordReqError || passwordMismatchError) {
      setPasswordError(passwordErrorMsg || passwordReqError);
      setRepeatedPasswordError(passwordMismatchError || repeatedPasswordErrorMsg);
      return false;
    }

    try {
      dispatch(setLoading(true));
      await Api.post('/auth/restore-password', { email, code, password, repeated_password: repeatedPassword });
      dispatch(setLoading(false));
      dispatch(
        openModal({
          text: 'Пароль успешно изменен.',
          onClick: () => router.push('/login'),
        })
      );
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCheckCode = async (checkedCode?: string) => {
    try {
      dispatch(setLoading(true));
      const result = await Api.getSilent('/auth/code-check', { email, code: checkedCode || code });
      if (!result.success) {
        if (result.payload.type === 'code') {
          setCodeError(true);
        } else {
          throw new Error(result.payload.message);
        }
      } else {
        setStep(2);
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleConfirmButton = async () => {
    if (step === 1 && !showCodeBlock) {
      await handleRequestCode();
    } else if (step === 1 && showCodeBlock) {
      await handleCheckCode();
    } else if (step === 2) {
      await handleSetPassword();
    }
  };

  const handleGoLogin = () => {
    router.push('/login');
  };
  const handleGoRegistration = () => {
    router.push('/registration');
  };

  return (
    <div className={'text-black flex w-full h-full items-center'}>
      <div className={'flex flex-col w-full h-full gap-1 text-3xl'}>
        <div className={'mb-20 text-white text-center'}>Изменение пароля</div>
        {step === 2 ? (
          <>
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
          </>
        ) : null}
        {step === 1 ? (
          <CustomInput
            className={'mb-6'}
            value={email}
            placeholder={'Email'}
            error={emailError}
            icon={'email'}
            onInput={(val) => {
              setEmail(val);
            }}
          />
        ) : null}
        <div className={'grow'} />
        {showCodeBlock && step === 1 && (
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
          customBorder
          size={24}
          iconStroke={'transparent'}
          icon={'refresh'}
          text={'Изменить'}
          onClick={handleConfirmButton}
        />
        <div className={'flex text-base w-full items-center justify-center mt-3'}>
          {showCodeBlock && step === 1 ? (
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
                Войти
              </span>
              <span
                className={
                  'ml-5 text-white cursor-pointer border-b-1 border-transparent hover:border-white hover:border-b-1'
                }
                onClick={handleGoRegistration}
              >
                Зарегистрироваться
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default routeChecker(RestorePassword, 'guestOnly');
