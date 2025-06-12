'use client';

import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import React, { useState } from 'react';
import AuthConfirmButton from '@/app/(views)/(auth)/components/AuthConfirmButton';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import Api from '@/core/api/api';
import InterviewMessage from '../[id]/components/InterviewMessage';

const ResumePrepare = () => {
  const [userCV, setUserCV] = useState<null | File>(null);
  const [checkResult, setCheckResult] = useState('');
  const dispatch = useAppDispatch();

  const checkResume = async () => {
    if (!userCV) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const resultFiles = [];
      if (userCV) {
        resultFiles.push(userCV);
      }

      const result = await Api.postFormData<{ cv: File | null }, { result: string }>('/interview/test-resume', {
        cv: userCV,
      });

      setCheckResult(result.payload.result);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={'w-full max-w-[1360px] mx-auto flex flex-col'}>
      <h1 className={'text-5xl mb-2'}>Проверка резюме</h1>
      <h2 className={'text-xl'}>Приложите свое резюме и мы дадим рекомендации по его исправлению</h2>
      <div className={'bg-bg-transparent-25 rounded-10 p-4 mt-9 grow mb-9 overflow-hidden'}>
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
                <div className={'mb-5 text-3xl'}>Результат проверки</div>
                {checkResult && <InterviewMessage message={checkResult} />}
              </div>
            </div>
          </div>
        </ScrollContainer>
      </div>
      <div className={'w-full flex items-center mt-2 mb-4'}>
        <AuthConfirmButton
          className={'w-[170px]! mx-auto'}
          customBorder
          size={24}
          icon={'check'}
          disabled={!!checkResult}
          text={'Проверить'}
          onClick={checkResume}
        />
      </div>
    </div>
  );
};

export default ResumePrepare;
