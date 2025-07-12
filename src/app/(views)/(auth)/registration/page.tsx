'use client';

import CustomCodeInput from '@/components/ui/code-input/CustomCodeInput';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import { setUnAuth } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import UIButton from '@/components/ui/button/UIButton';
import routeChecker from '@/hoc/routeChecker';
import UIInput from '@/components/ui/input/UIInput';
import { getPublicFileLink } from '@/core/utils/files';

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
    } catch (e) {
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
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoLogin = () => {
    router.push('/login');
  };

  const [privatePolicy, setPrivatePolicy] = useState<any>(null);
  const [personalTerms, setPersonalTerms] = useState<any>(null);

  const loadSystemFiles = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const privatePolicyFile = await Api.get<undefined, any>('/system/files/privacy_policy');
      setPrivatePolicy(privatePolicyFile.payload);
      const personalTermsFile = await Api.get<undefined, any[]>('/system/files/personal_terms');
      setPersonalTerms(personalTermsFile.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    loadSystemFiles();
  }, [loadSystemFiles]);

  return (
    <div className={'text-black flex flex-col w-full h-full items-center mx-4'}>
      <div className={'mb-16 text-white text-center text-3xl lg:text-5xl font-bold'}>Добро пожаловать!</div>
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
            setShowCodeBlock(false);
            setEmailError('');
          }}
        />
        {!showCodeBlock && (
          <div>
            <UIInput
              label={'Пароль'}
              className={'mb-3'}
              type={'password'}
              placeholder={'Пароль'}
              id={'password'}
              value={password}
              error={passwordError}
              onInput={(val) => {
                setPassword(val);
                setPasswordError('');
              }}
            />
            <UIInput
              label={'Повторите пароль'}
              type={'password'}
              placeholder={'Повторите пароль'}
              id={'repeated-password'}
              value={repeatedPassword}
              error={repeatedPasswordError}
              onInput={(val) => {
                setRepeatedPassword(val);
                setRepeatedPasswordError('');
              }}
            />
          </div>
        )}
        {showCodeBlock && (
          <div className={'flex flex-col text-center'}>
            <div className={'text-white text-2xl mb-3'}>Подтвердите Email</div>
            <div className={'text-white text-sm mb-3'}>
              Код отправлен на адрес <span className={'text-main-purple'}>{email}</span>
            </div>
            <CustomCodeInput
              className={'mx-auto rounded-input'}
              error={codeError}
              value={code}
              onInput={handleInputCode}
            />
            <div
              className={'text-main-purple text-sm mt-3 hover:underline cursor-pointer'}
              onClick={handleRequestCode}
            >
              Отправить повторно?
            </div>
          </div>
        )}
        <UIButton
          className={'w-full mt-3'}
          disabled={
            !!emailError ||
            !!passwordError ||
            !!repeatedPasswordError ||
            (showCodeBlock && (code.length < 4 || codeError))
          }
          text={'ЗАРЕГИСТРИРОВАТЬСЯ'}
          onClick={showCodeBlock ? handleRegister : handleRequestCode}
        />
        <div className={'flex flex-col items-center my-6'}>
          <UIButton
            className={'mx-auto'}
            text={'Вход'}
            type={'transparent'}
            onClick={handleGoLogin}
            iconBefore={'login-new'}
          />
          {privatePolicy && personalTerms && (
            <div className={'text-white text-xs mt-2'}>
              <span>
                Регистрируясь на сайте, Вы даете разрешение на хранение и обработку предоставленных данных. Вы всегда
                можете прочитать полную и актуальную версию
              </span>{' '}
              <a
                className={'text-main-purple text-xs cursor-pointer hover:underline'}
                target={'_blank'}
                href={getPublicFileLink(personalTerms?.path || '')}
                download
                rel={'noreferrer'}
              >
                Согласия на обработку персональных данных
              </a>{' '}
              и{' '}
              <a
                className={'text-main-purple text-xs cursor-pointer hover:underline'}
                target={'_blank'}
                href={getPublicFileLink(privatePolicy?.path || '')}
                download
                rel={'noreferrer'}
              >
                Политики конфиденциальности
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default routeChecker(RegistrationPage, 'guestOnly');
