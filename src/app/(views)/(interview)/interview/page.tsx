'use client';

import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import React, { useState } from 'react';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import Api from '@/core/api/api';
import { useRouter } from 'next/navigation';
import UIButton from '@/components/ui/button/UIButton';
import SwitchButton from '@/components/ui/switch-button/SwitchButton';
import UITextarea from '@/components/ui/textarea/UITextarea';
import routeChecker from '@/hoc/routeChecker';

const InterviewView = () => {
  const [vakanciesFile, setVakanciesFile] = useState<null | File>(null);
  const [userCV, setUserCV] = useState<null | File>(null);
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
      const result = await Api.postFormData<{ user_prompt: string; cv: File | null; vac: File | null }, { id: string }>(
        '/interview/create',
        {
          user_prompt: userDescription,
          cv: userCV,
          vac: vakanciesFile,
        }
      );

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
    <section className={'mt-6 w-full max-w-[1440px] mx-auto h-full'}>
      <div
        className={'lg:h-[198px] rounded-b-4xl flex flex-col justify-center items-center mb-6 px-4 lg:py-auto py-14'}
        style={{ background: 'var(--main-gradient)' }}
      >
        <div className={'w-full lg:max-w-[808px] flex flex-col gap-6 text-center'}>
          <div className={'lg:text-5xl text-4xl leading-[100%] font-bold'}>Cобеседование</div>
          <div className={'lg:text-xl text-base'}>
            Укажите конфигурацию параметров для составления контекста собеседования.
          </div>
        </div>
      </div>

      <div className={'p-6 bg-main-black rounded-3xl gap-4 z-20 text-center mx-4'}>
        <div className={'max-w-[808px] flex flex-col mx-auto'}>
          <FileDropzone
            label={'Ваше резюме'}
            maxFileSize={2}
            file={userCV}
            formats={['docx', 'pdf']}
            onFileSelected={setUserCV}
          />
          <SwitchButton
            className={'mt-6'}
            label={'Добавить файл с вакансией'}
            checked={addVCFile}
            onChange={(val) => setAddVCFile(val)}
          />
          <div className={'text-left text-xs mt-1 text-text-disabled'}>Файл вакансии на которую вы откликаетесь</div>
          {addVCFile && (
            <FileDropzone
              className={'mt-6'}
              label={'Ваша вакансия'}
              file={vakanciesFile}
              maxFileSize={2}
              formats={['docx', 'pdf']}
              onFileSelected={setVakanciesFile}
            />
          )}
          <UITextarea
            className={'mt-6'}
            id={'user-description'}
            label={'Дополнительная информация'}
            hint={
              'Здесь можно описать вакансию, на которую Вы хотите пройти собеседование или дать больше информации о себе'
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
        />
      </div>
    </section>
  );
};

export default routeChecker(InterviewView, 'authOnly');
