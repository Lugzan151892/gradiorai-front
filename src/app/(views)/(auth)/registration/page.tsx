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
import { Trans } from '@/i18n/Trans';
import { useI18n } from '@/i18n/I18nProvider';

const RegistrationPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | React.ReactNode>('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | React.ReactNode>('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = useState<string | React.ReactNode>('');
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const handleCheckIsFieldsValid = () => {
    const emailErrorMsg = email ? (
      ''
    ) : (
      <Trans
        ns={'common'}
        k={'common_field_empty'}
      />
    );
    const emailRegError = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? (
      ''
    ) : (
      <Trans
        ns={'common'}
        k={'common_invalid_format'}
      />
    );
    const passwordErrorMsg = password ? (
      ''
    ) : (
      <Trans
        ns={'common'}
        k={'common_field_empty'}
      />
    );
    const passwordReqError = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password) ? (
      ''
    ) : (
      <Trans
        ns={'common'}
        k={'common_password_validation'}
      />
    );
    const repeatedPasswordErrorMsg = repeatedPassword ? (
      ''
    ) : (
      <Trans
        ns={'common'}
        k={'common_field_empty'}
      />
    );
    const passwordMismatchError =
      password !== repeatedPassword ? (
        <Trans
          ns={'common'}
          k={'common_passwords_doesnt_match'}
        />
      ) : (
        ''
      );

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
      const privatePolicyFile = await Api.getSilent<undefined, any>('/system/files/privacy_policy');
      setPrivatePolicy(privatePolicyFile.payload);
      const personalTermsFile = await Api.getSilent<undefined, any[]>('/system/files/personal_terms');
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

  const { t } = useI18n();

  return (
    <div className={'text-black flex flex-col w-full h-full items-center mx-4'}>
      <div className={'mb-16 text-white text-center text-3xl lg:text-5xl font-bold'}>
        <Trans
          ns={'auth'}
          k={'auth_welcome'}
        />
      </div>
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
              label={
                <Trans
                  ns={'common'}
                  k={'common_password'}
                />
              }
              className={'mb-3'}
              type={'password'}
              placeholder={t('common', 'common_password')}
              id={'password'}
              value={password}
              error={passwordError}
              onInput={(val) => {
                setPassword(val);
                setPasswordError('');
              }}
            />
            <UIInput
              label={
                <Trans
                  ns={'common'}
                  k={'common_repeat_password'}
                />
              }
              type={'password'}
              placeholder={t('common', 'common_repeat_password')}
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
            <div className={'text-white text-2xl mb-3'}>
              <Trans
                ns={'common'}
                k={'common_confirm_email'}
              />
            </div>
            <div className={'text-white text-sm mb-3'}>
              <Trans
                ns={'auth'}
                k={'auth_code_was_sent_to'}
              />{' '}
              <span className={'text-main-purple'}>{email}</span>
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
              <Trans
                ns={'auth'}
                k={'auth_code_resent'}
              />
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
          onClick={showCodeBlock ? handleRegister : handleRequestCode}
        >
          <Trans
            ns={'auth'}
            k={'auth_registration_as_reg'}
            format={'uppercase'}
          />
        </UIButton>
        <div className={'flex flex-col items-center my-6'}>
          <UIButton
            className={'mx-auto'}
            text={'Вход'}
            type={'transparent'}
            onClick={handleGoLogin}
            iconBefore={'login-new'}
          >
            <Trans
              ns={'auth'}
              k={'auth_login_as_entrance'}
            />
          </UIButton>
          {privatePolicy && personalTerms && (
            <div className={'text-white text-xs mt-2 text-center flex flex-col'}>
              <Trans
                ns={'auth'}
                k={'auth_confirm_terms_text'}
              />
              <a
                className={'text-main-purple text-xs cursor-pointer hover:underline'}
                target={'_blank'}
                href={getPublicFileLink(personalTerms?.path || '')}
                rel={'noreferrer'}
              >
                <Trans
                  ns={'common'}
                  k={'common_terms_condition'}
                />
              </a>
              <a
                className={'text-main-purple text-xs cursor-pointer hover:underline'}
                target={'_blank'}
                href={getPublicFileLink(privatePolicy?.path || '')}
                rel={'noreferrer'}
              >
                <Trans
                  ns={'common'}
                  k={'common_private_policy'}
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default routeChecker(RegistrationPage, 'guestOnly');
