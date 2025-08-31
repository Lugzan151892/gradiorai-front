'use client';

import CustomCodeInput from '@/components/ui/code-input/CustomCodeInput';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import UIButton from '@/components/ui/button/UIButton';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { openModal } from '@/store/tech/techSlice';
import routeChecker from '@/hoc/routeChecker';
import UIInput from '@/components/ui/input/UIInput';
import { Trans } from '@/i18n/Trans';
import { useI18n } from '@/i18n/I18nProvider';

const RestorePassword = () => {
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
  const [step, setStep] = useState<1 | 2>(1);

  const handleInputCode = async (val: string) => {
    setCodeError(false);
    setCode(val);
    if (val.length === 4) {
      await handleCheckCode(val);
    }
  };

  const handleRequestCode = async () => {
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

    if (emailErrorMsg || emailRegError) {
      setEmailError(emailErrorMsg || emailRegError);
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await Api.getSilent('/auth/restore-code-request', { email });

      if (!result.success) {
        if (result.payload.type === 'email') {
          setEmailError(result.payload.message || '');
        } else {
          throw new Error(result.payload.message);
        }
      } else {
        setShowCodeBlock(true);
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSetPassword = async () => {
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
          text: (
            <Trans
              ns={'auth'}
              k={'auth_password_changed_successfully'}
            />
          ),
          onClick: () => router.push('/login'),
        })
      );
    } catch (e) {
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
    } catch (e) {
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

  const { t } = useI18n();

  return (
    <div className={'text-black flex flex-col w-full h-full items-center mx-4'}>
      <div className={'mb-16 text-white text-center text-3xl lg:text-5xl font-bold'}>
        <Trans
          ns={'auth'}
          k={'auth_change_password_title'}
        />
      </div>
      <div className={'w-full max-w-xs'}>
        {step === 2 ? (
          <>
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
          </>
        ) : null}
        {step === 1 ? (
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
        ) : null}
        {showCodeBlock && step === 1 && (
          <div className={'flex flex-col text-center mb-3'}>
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
          className={'w-full mt-2'}
          disabled={
            !!emailError ||
            !!passwordError ||
            !!repeatedPasswordError ||
            (showCodeBlock && (code.length < 4 || codeError))
          }
          onClick={handleConfirmButton}
        >
          <Trans
            ns={'auth'}
            k={'auth_change_password_change'}
          />
        </UIButton>
        <div className={'flex w-full justify-center gap-4 my-6'}>
          <UIButton
            type={'transparent'}
            onClick={handleGoRegistration}
            iconBefore={'user-add'}
          >
            <Trans
              ns={'auth'}
              k={'auth_registration_as_reg'}
            />
          </UIButton>
          <UIButton
            type={'transparent'}
            onClick={handleGoLogin}
            iconBefore={'login-new'}
          >
            <Trans
              ns={'auth'}
              k={'auth_login_as_entrance'}
            />
          </UIButton>
        </div>
      </div>
    </div>
  );
};

export default routeChecker(RestorePassword, 'guestOnly');
