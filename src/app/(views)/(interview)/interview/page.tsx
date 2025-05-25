'use client';

import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import CustomTextarea from '@/components/ui/textarea/CustomTextarea';
import React, { useState } from 'react';
import AuthConfirmButton from '@/app/(views)/(auth)/components/AuthConfirmButton';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import Api from '@/core/api/api';
import { useRouter } from 'next/navigation';

const InterviewView = () => {
  const [vakanciesFile, setVakanciesFile] = useState<null | File>(null);
  const [userCV, setUserCV] = useState<null | File>(null);
  const [userDescription, setUserDescription] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const startInterview = async () => {
    if (!userDescription) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await Api.post<{ user_prompt: string }, { id: string }>('/interview/create', {
        user_prompt: userDescription,
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

  return (
    <div className={'w-full max-w-[1360px] mx-auto flex flex-col overflow-hidden'}>
      <h1 className={'text-5xl mb-2'}>Настройки генерации</h1>
      <h2 className={'text-xl'}>Укажите конфигурацию параметров для составления контекста собеседования</h2>
      <div className={'bg-bg-transparent-25 rounded-10 p-4 mt-9 flex-grow mb-9 overflow-hidden'}>
        <ScrollContainer>
          <div className={'flex flex-col w-full h-full justify-center'}>
            <div className={'flex w-full justify-around'}>
              <div className={'max-w-md'}>
                <div className={'mb-5 text-3xl'}>Ваше резюме</div>
                <FileDropzone
                  maxFileSize={2}
                  formats={['docx', 'pdf']}
                  onFileSelected={setUserCV}
                />
                {userCV ? <div>{userCV.name}</div> : null}
              </div>
              <div className={'max-w-md'}>
                <div className={'mb-5 text-3xl'}>Ваша вакансия</div>
                <FileDropzone
                  maxFileSize={2}
                  formats={['docx', 'pdf']}
                  onFileSelected={setVakanciesFile}
                />
                {vakanciesFile ? <div>{vakanciesFile.name}</div> : null}
              </div>
            </div>
            <div className={'w-full max-w-md mt-20 mx-auto'}>
              <div className={'mb-2 text-base'}>Введите дополнительную информацию о себе</div>
              <CustomTextarea
                value={userDescription}
                onInput={setUserDescription}
              />
            </div>
          </div>
        </ScrollContainer>
      </div>
      <div className={'w-full flex items-center mt-2 mb-4'}>
        <AuthConfirmButton
          className={'!w-[170px] mx-auto'}
          customBorder
          size={24}
          icon={'check'}
          disabled={!userDescription}
          text={'Начать'}
          onClick={startInterview}
        />
      </div>
    </div>
  );
};

export default InterviewView;
