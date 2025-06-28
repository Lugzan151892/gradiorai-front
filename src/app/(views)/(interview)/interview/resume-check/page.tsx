'use client';

import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import React, { useState } from 'react';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import Api from '@/core/api/api';
import InterviewMessage from '@/app/(views)/(interview)/interview/[id]/components/InterviewMessage';
import UIButton from '@/components/ui/button/UIButton';
import UILabel from '@/components/ui/label/UILabel';
import routeChecker from '@/hoc/routeChecker';

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

  const clearData = () => {
    setUserCV(null);
    setCheckResult('');
  };

  return (
    <section className={'w-full max-w-[1440px] mx-auto flex flex-col pb-3'}>
      <div
        className={'lg:h-[198px] rounded-b-4xl flex flex-col justify-center items-center mb-6 px-4 lg:py-auto py-14'}
        style={{ background: 'var(--main-gradient)' }}
      >
        <div className={'w-full lg:max-w-[808px] flex flex-col gap-6 text-center'}>
          <div className={'lg:text-5xl text-4xl leading-[100%] font-bold'}>Проверка резюме</div>
          <div className={'lg:text-xl text-base'}>Приложите свое резюме и получите рекомендации по его улучшению.</div>
        </div>
      </div>
      <div className={'p-6 bg-main-black rounded-3xl flex flex-col gap-3 text-center mx-2 flex-1'}>
        <div className={'flex flex-col'}>
          <FileDropzone
            label={'Ваше резюме'}
            maxFileSize={2}
            file={userCV}
            formats={['docx', 'pdf']}
            onFileSelected={setUserCV}
          />
          <div className={'w-full flex items-center mt-2'}>
            <UIButton
              className={'mx-auto'}
              disabled={!checkResult && !userCV}
              text={!!checkResult ? 'Сбросить результат' : 'Проверить'}
              onClick={!!checkResult ? clearData : checkResume}
            />
          </div>
        </div>
        <div className={'flex flex-col'}>
          <UILabel className={'mb-2'}>Результат проверки</UILabel>
          <div className={'bg-main-dark p-4 text-center rounded-3xl min-h-[300px] max-h-[400px] overflow-auto'}>
            {checkResult && (
              <InterviewMessage
                className={'mb-2 mr-auto'}
                background={'bg-transparent'}
                message={checkResult}
                isHuman={false}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default routeChecker(ResumePrepare, 'authOnly');
