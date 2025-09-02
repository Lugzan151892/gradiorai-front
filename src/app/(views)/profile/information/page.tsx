'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import UIInput from '@/components/ui/input/UIInput';
import UIButton from '@/components/ui/button/UIButton';
import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import CustomCodeInput from '@/components/ui/code-input/CustomCodeInput';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api, { API_PATH } from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { openModal } from '@/store/tech/techSlice';
import { getUserData } from '@/store/user/userSlice';
import { AvatarUploadModal } from '@/app/(views)/profile/components/AvatarUploadModal';
import UserAvatar from '@/components/user-avatar/UserAvatar';
import { IFile } from '@/core/interfaces/types';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import { Trans } from '@/i18n/Trans';

enum ESET_PASSWORD_STEPS {
  CURRENT_PASSWORD = 1,
  EMAIL_CONFIRMATION,
}

const ProfileInformation = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [userCV, setUserCV] = useState<null | File | IFile>(null);
  const [passwordStep, setPasswordStep] = useState(ESET_PASSWORD_STEPS.CURRENT_PASSWORD);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState<string | React.ReactNode>('');
  const [repeatedNewPassword, setRepeatedNewPassword] = useState('');
  const [repeatedNewPasswordError, setRepeatedNewPasswordError] = useState<string | React.ReactNode>('');

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const [openAvatarModal, setOpenAvatarModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const handleClick = () => {
    setAvatarFile(null);
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setOpenAvatarModal(true);
    }
  };

  const handleRequestCode = async () => {
    try {
      dispatch(setLoading(true));
      await Api.get('/auth/restore-code-request', { email: user?.email });
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSetPassword = async () => {
    const newPasswordErrorMsg = password ? (
      ''
    ) : (
      <Trans
        ns={'common'}
        k={'common_field_empty'}
      />
    );
    const newPasswordReqError = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password) ? (
      ''
    ) : (
      <Trans
        ns={'common'}
        k={'common_password_validation'}
      />
    );
    const repeatedNewPasswordErrorMsg = repeatedNewPassword ? (
      ''
    ) : (
      <Trans
        ns={'common'}
        k={'common_field_empty'}
      />
    );
    const passwordMismatchError =
      newPassword !== repeatedNewPassword ? (
        <Trans
          ns={'common'}
          k={'common_passwords_doesnt_match'}
        />
      ) : (
        ''
      );

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
        setPasswordStep(ESET_PASSWORD_STEPS.EMAIL_CONFIRMATION);
        await handleRequestCode();
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
          dispatch(setLoading(false));
          return;
        } else {
          throw new Error(result.payload.message);
        }
      }

      await Api.post('/auth/restore-password', {
        email: user?.email,
        code: checkedCode || code,
        password: newPassword,
        repeated_password: repeatedNewPassword,
      });

      dispatch(
        openModal({
          text: (
            <Trans
              ns={'common'}
              k={'common_password_changed'}
            />
          ),
          type: 'success',
        })
      );

      setPasswordStep(ESET_PASSWORD_STEPS.CURRENT_PASSWORD);
      setPassword('');
      setNewPassword('');
      setRepeatedNewPassword('');
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSetUsername = async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.putSilent('/user/username', { username });
      if (!result.success) {
        if (result.payload.type === 'username') {
          setUsernameError(result.payload.message || '');
          dispatch(setLoading(false));
          return;
        } else {
          throw new Error(result.payload.message);
        }
      }

      dispatch(
        openModal({
          text: (
            <Trans
              ns={'profile'}
              k={'profile_username_changed'}
            />
          ),
          type: 'success',
        })
      );

      dispatch(getUserData());
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteUserFile = async (type: 'avatar' | 'cv') => {
    try {
      dispatch(setLoading(true));
      await Api.delete('/user/files/' + type);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUploadCv = async (file: File | null) => {
    setUserCV(file);

    if (!file) {
      deleteUserFile('cv');
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.postFormData<{ file: File }, any>('/user/files/cv', { file });
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const dbFilePath = useMemo(() => {
    const isDbFile = userCV && !(userCV instanceof File);

    return isDbFile ? `${API_PATH}/user/files/download/cv` : undefined;
  }, [userCV]);

  useEffect(() => {
    setUsername(user?.username || '');
    const userCv = user?.files.find((file) => file.type === 'CV');
    if (userCv) {
      setUserCV(userCv);
    }
  }, [user]);

  return (
    <div className={'flex flex-wrap lg:flex-row flex-col gap-6'}>
      <div className={'p-6 bg-main-black rounded-3xl h-auto h-full min-h-[460px] lg:w-[420px] w-full flex flex-col'}>
        <div className={'text-2xl font-bold mb-6'}>
          <Trans
            ns={'profile'}
            k={'profile_user_profile'}
          />
        </div>
        <div className={'flex flex-col items-center mb-4'}>
          <UserAvatar size={80} />
          <input
            type={'file'}
            accept={'image/*'}
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
          <div
            className={'cursor-pointer hover:underline hover:text-main-purple mt-2'}
            onClick={handleClick}
          >
            {user?.files.some((file) => file.type === 'AVATAR') ? (
              <Trans
                ns={'profile'}
                k={'profile_change_avatar'}
              />
            ) : (
              <Trans
                ns={'profile'}
                k={'profile_add_avatar'}
              />
            )}
          </div>
        </div>
        <div className={'flex flex-col h-full grow'}>
          <UIInput
            id={'name'}
            label={
              <Trans
                ns={'common'}
                k={'common_name'}
              />
            }
            level={'square'}
            autoComplete={false}
            value={username}
            error={usernameError}
            onInput={(val) => {
              setUsername(val);
              setUsernameError('');
            }}
          />
          <UIButton
            className={'mt-auto'}
            type={'square'}
            onClick={handleSetUsername}
          >
            <Trans
              ns={'common'}
              k={'common_change'}
              format={'uppercase'}
            />
          </UIButton>
        </div>
      </div>
      <div className={'p-6 bg-main-black rounded-3xl min-h-[460px] lg:w-[420px] w-full flex flex-col'}>
        <div className={'text-2xl font-bold mb-6'}>
          <Trans
            ns={'common'}
            k={'common_set_password'}
          />
        </div>
        {passwordStep === ESET_PASSWORD_STEPS.CURRENT_PASSWORD && (
          <div className={'flex flex-col h-full gap-2'}>
            <UIInput
              level={'square'}
              label={
                <Trans
                  ns={'common'}
                  k={'common_current_password'}
                />
              }
              type={'password'}
              autoComplete={false}
              value={password}
              error={passwordError}
              onInput={(val) => {
                setPassword(val);
                setPasswordError('');
              }}
            />
            <UIInput
              level={'square'}
              label={
                <Trans
                  ns={'common'}
                  k={'common_new_password'}
                />
              }
              type={'password'}
              value={newPassword}
              error={newPasswordError}
              onInput={(val) => {
                setNewPassword(val);
                setNewPasswordError('');
              }}
            />
            <UIInput
              level={'square'}
              label={
                <Trans
                  ns={'common'}
                  k={'common_confirm_password'}
                />
              }
              type={'password'}
              value={repeatedNewPassword}
              error={repeatedNewPasswordError}
              onInput={(val) => {
                setRepeatedNewPassword(val);
                setRepeatedNewPasswordError('');
              }}
            />
            <UIButton
              className={'mt-auto'}
              type={'square'}
              onClick={handleSetPassword}
            >
              <Trans
                ns={'common'}
                k={'common_change'}
                format={'uppercase'}
              />
            </UIButton>
          </div>
        )}
        {passwordStep === ESET_PASSWORD_STEPS.EMAIL_CONFIRMATION && (
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
              <span className={'text-main-purple'}>{user?.email}</span>
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
      </div>
      <div className={'p-6 bg-main-black rounded-3xl min-h-[460px] lg:w-[460px] max-w-[460px]'}>
        <div className={'text-2xl font-bold mb-6'}>
          <Trans
            ns={'profile'}
            k={'profile_cv_file'}
          />
        </div>
        <div>
          <div className={'flex items-center gap-2 mb-4'}>
            <CustomIcon name={'info-icon'} />
            <div>
              <Trans
                ns={'profile'}
                k={'profile_cv_file_description'}
              />
            </div>
          </div>
          <FileDropzone
            maxFileSize={2}
            file={userCV}
            filePath={dbFilePath}
            formats={['docx', 'pdf']}
            onFileSelected={(e) => handleUploadCv(e)}
          />
        </div>
      </div>
      {avatarFile && (
        <AvatarUploadModal
          file={avatarFile}
          open={openAvatarModal}
          onOpenChange={setOpenAvatarModal}
          onFileChanged={() => dispatch(getUserData())}
        />
      )}
    </div>
  );
};

export default ProfileInformation;
