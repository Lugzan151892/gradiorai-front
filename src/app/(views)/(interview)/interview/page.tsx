'use client';

import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import React, { useEffect, useMemo, useState } from 'react';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import Api, { API_PATH } from '@/core/api/api';
import { useRouter } from 'next/navigation';
import UIButton from '@/components/ui/button/UIButton';
import SwitchButton from '@/components/ui/switch-button/SwitchButton';
import UITextarea from '@/components/ui/textarea/UITextarea';
import routeChecker from '@/hoc/routeChecker';
import { Trans } from '@/i18n/Trans';
import { RootState } from '@/store';
import { IFile } from '@/core/interfaces/types';

const InterviewView = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const [vakanciesFile, setVakanciesFile] = useState<null | File>(null);
  const [userCV, setUserCV] = useState<null | File | IFile>(null);
  const [userDescription, setUserDescription] = useState('');
  const [addVCFile, setAddVCFile] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const startInterview = async () => {
    if (!userCV) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const resultFiles = [];
      if (userCV) {
        resultFiles.push(userCV);
      }

      if (vakanciesFile) {
        resultFiles.push(vakanciesFile);
      }
      const result = await Api.postFormData<
        { user_prompt: string; cv: File | IFile | null; vac: File | null },
        { id: string }
      >('/interview/create', {
        user_prompt: userDescription,
        cv: userCV,
        vac: vakanciesFile,
      });

      if (result.payload.id) {
        router.push(`/interview/${result.payload.id}`);
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const currentUserCv = user?.files.find((file) => file.type === 'CV');
    if (currentUserCv) {
      setUserCV(currentUserCv);
    }
  }, [user]);

  const dbFilePath = useMemo(() => {
    const isDbFile = userCV && !(userCV instanceof File);

    return isDbFile ? `${API_PATH}/user/files/download/cv` : undefined;
  }, [userCV]);

  return (
    <section className={'mt-6 w-full lg:px-10 h-full'}>
      <div
        className={'lg:h-[198px] rounded-b-4xl flex flex-col justify-center items-center mb-6 px-4 lg:py-auto py-14'}
        style={{ background: 'var(--main-gradient)' }}
      >
        <div className={'w-full lg:max-w-[808px] flex flex-col gap-6 text-center'}>
          <div className={'lg:text-5xl text-4xl leading-[100%] font-bold'}>
            <Trans
              ns={'common'}
              k={'common_interview'}
            />
          </div>
          <div className={'lg:text-xl text-base'}>
            <Trans
              ns={'interview'}
              k={'interview_description'}
            />
          </div>
        </div>
      </div>

      <div className={'p-6 bg-main-black rounded-3xl gap-4 z-20 text-center mx-4'}>
        <div className={'max-w-[808px] flex flex-col mx-auto'}>
          <FileDropzone
            label={
              <Trans
                ns={'interview'}
                k={'interview_cv_file'}
              />
            }
            maxFileSize={2}
            file={userCV}
            filePath={dbFilePath}
            formats={['docx', 'pdf']}
            onFileSelected={setUserCV}
          />
          <SwitchButton
            className={'mt-6'}
            label={
              <Trans
                ns={'interview'}
                k={'interview_add_file_vakancies'}
              />
            }
            checked={addVCFile}
            onChange={(val) => setAddVCFile(val)}
          />
          <div className={'text-left text-xs mt-1 text-text-disabled'}>
            <Trans
              ns={'interview'}
              k={'interview_add_file_vakancies_description'}
            />
          </div>
          {addVCFile && (
            <FileDropzone
              className={'mt-6'}
              label={
                <Trans
                  ns={'interview'}
                  k={'interview_your_vakancie'}
                />
              }
              file={vakanciesFile}
              maxFileSize={2}
              formats={['docx', 'pdf']}
              onFileSelected={setVakanciesFile}
            />
          )}
          <UITextarea
            className={'mt-6'}
            id={'user-description'}
            label={
              <Trans
                ns={'interview'}
                k={'interview_additional_info'}
              />
            }
            hint={
              <Trans
                ns={'interview'}
                k={'interview_additional_info_description'}
              />
            }
            value={userDescription}
            rows={10}
            onInput={setUserDescription}
          />
        </div>
      </div>
      <div className={'w-full flex items-center mt-8 mb-6 px-4'}>
        <UIButton
          className={'mx-auto lg:w-auto w-full'}
          iconAfter={'arrow-top-right'}
          disabled={!userCV}
          text={'НАЧАТЬ'}
          onClick={startInterview}
        >
          <Trans
            ns={'interview'}
            k={'interview_start'}
            format={'uppercase'}
          />
        </UIButton>
      </div>
    </section>
  );
};

export default routeChecker(InterviewView, 'authOnly');
