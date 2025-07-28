'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import userAvatarEmpty from '@/assets/icons/user-avatar-empty.svg';
import UIInput from '@/components/ui/input/UIInput';
import UIButton from '@/components/ui/button/UIButton';
import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import CustomCodeInput from '@/components/ui/code-input/CustomCodeInput';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { openModal } from '@/store/tech/techSlice';

enum ESET_PASSWORD_STEPS {
  CURRENT_PASSWORD = 1,
  NEW_PASSWORD,
  EMAIL_CONFIRMATION,
}

const ProfileInformation = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState('');
  const [userCV, setUserCV] = useState<null | File>(null);
  const [passwordStep, setPasswordStep] = useState(ESET_PASSWORD_STEPS.CURRENT_PASSWORD);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [repeatedNewPassword, setRepeatedNewPassword] = useState('');
  const [repeatedNewPasswordError, setRepeatedNewPasswordError] = useState('');

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const handleSetPassword = async () => {
    const newPasswordErrorMsg = password ? '' : 'Поле не заполнено';
    const newPasswordReqError = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password)
      ? ''
      : 'Пароль должен содержать минимум 8 символов, заглавную букву и спецсимвол';
    const repeatedNewPasswordErrorMsg = repeatedNewPassword ? '' : 'Поле не заполнено';
    const passwordMismatchError = newPassword !== repeatedNewPassword ? 'Пароли не совпадают' : '';

    if (newPasswordErrorMsg || repeatedNewPasswordErrorMsg || newPasswordReqError || passwordMismatchError) {
      setNewPasswordError(newPasswordErrorMsg || newPasswordReqError);
      setRepeatedNewPasswordError(passwordMismatchError || repeatedNewPasswordErrorMsg);
      return false;
    }

    try {
      dispatch(setLoading(true));
      const result = await Api.postSilent('/auth/check-password', {
        email: user?.email,
        password,
      });
      if (!result.success) {
        if (result.payload.type === 'password') {
          setPasswordError(result.payload.message || '');
        } else {
          throw new Error(result.payload.message);
        }
      } else {
        setPasswordStep(ESET_PASSWORD_STEPS.NEW_PASSWORD);
      }
      dispatch(setLoading(false));
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInputCode = async (val: string) => {
    setCodeError(false);
    setCode(val);
    if (val.length === 4) {
      await handleCheckCode(val);
    }
  };

  const handleCheckCode = async (checkedCode?: string) => {
    try {
      dispatch(setLoading(true));
      const result = await Api.getSilent('/auth/code-check', { email: user?.email, code: checkedCode || code });
      if (!result.success) {
        if (result.payload.type === 'code') {
          setCodeError(true);
        } else {
          throw new Error(result.payload.message);
        }
      } else {
        setPasswordStep(ESET_PASSWORD_STEPS.NEW_PASSWORD);
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={'flex gap-6 justify-center'}>
      <div className={'p-6 bg-main-black rounded-3xl min-h-[460px] lg:w-[460px] max-w-[460px] flex flex-col'}>
        <div className={'text-2xl font-bold mb-6'}>Профиль пользователя</div>
        <div className={'flex flex-col items-center mb-4 mt-auto'}>
          <Image
            src={userAvatarEmpty}
            alt={'profile'}
            width={80}
            height={80}
          />
          <div className={'cursor-pointer hover:underline hover:text-main-purple mt-2'}>Добавить фото</div>
        </div>
        <div className={'flex flex-col'}>
          <UIInput
            id={'name'}
            label={'Имя'}
            value={userName}
            onInput={setUserName}
          />
          <UIButton text={'ИЗМЕНИТЬ'} />
        </div>
      </div>
      <div className={'p-6 bg-main-black rounded-3xl min-h-[460px] lg:w-[460px] max-w-[460px] flex flex-col'}>
        <div className={'text-2xl font-bold mb-6'}>Изменить пароль</div>
        {passwordStep === ESET_PASSWORD_STEPS.CURRENT_PASSWORD && (
          <div className={'flex flex-col h-full gap-2'}>
            <UIInput
              level={'small'}
              label={'Текущий пароль'}
            />
            <UIInput
              level={'small'}
              label={'Новый пароль'}
            />
            <UIInput
              level={'small'}
              label={'Подтвердите пароль'}
            />
            <UIButton
              className={'mt-auto'}
              text={'ИЗМЕНИТЬ'}
              onClick={() => setPasswordStep(ESET_PASSWORD_STEPS.NEW_PASSWORD)}
            />
          </div>
        )}
        {passwordStep === ESET_PASSWORD_STEPS.NEW_PASSWORD && (
          <div className={'flex flex-col text-center mb-3'}>
            <div className={'text-white text-2xl mb-3'}>Подтвердите Email</div>
            <div className={'text-white text-sm mb-3'}>
              Код отправлен на адрес <span className={'text-main-purple'}>{user?.email}</span>
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
      </div>
      <div className={'p-6 bg-main-black rounded-3xl min-h-[460px] lg:w-[460px] max-w-[460px]'}>
        <div className={'text-2xl font-bold mb-6'}>Файл для собеседований</div>
        <FileDropzone
          maxFileSize={2}
          file={userCV}
          formats={['docx', 'pdf']}
          onFileSelected={setUserCV}
        />
      </div>
    </div>
  );
};

export default ProfileInformation;
