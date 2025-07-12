'use client';

import React, { useState } from 'react';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import Api from '@/core/api/api';
import InterviewMessage from '@/app/(views)/(interview)/interview/[id]/components/InterviewMessage';
import UIButton from '@/components/ui/button/UIButton';
import UILabel from '@/components/ui/label/UILabel';
import UITextarea from '@/components/ui/textarea/UITextarea';

const ResumeCreate = () => {
  const [userDescription, setUserDescription] = useState('');
  const [createResult, setCreateResult] = useState('');
  const dispatch = useAppDispatch();

  const createResume = async () => {
    if (!userDescription) {
      return;
    }

    try {
      dispatch(setLoading(true));

      const result = await Api.post<{ prompt: string }, { result: string }>('/interview/create-resume', {
        prompt: userDescription,
      });

      setCreateResult(result.payload.result);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearData = () => {
    setUserDescription('');
    setCreateResult('');
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
          <UITextarea
            className={'mt-6'}
            id={'user-description'}
            label={'О себе'}
            hint={
              'Подробно опишите информаицю о себе и своих навыках и обученный AI подготовит текст резюме специально под Вас'
            }
            value={userDescription}
            disabled={!!createResult}
            rows={10}
            onInput={setUserDescription}
          />
          <div className={'w-full flex items-center mt-2'}>
            <UIButton
              className={'mx-auto'}
              disabled={!createResult && !userDescription}
              text={!!createResult ? 'Сбросить результат' : 'Подготовить текст резюме'}
              onClick={!!createResult ? clearData : createResume}
            />
          </div>
        </div>
        <div className={'flex flex-col'}>
          <UILabel className={'mb-2'}>Результат генерации</UILabel>
          <div className={'bg-main-dark p-4 text-center rounded-3xl min-h-[300px] max-h-[400px] overflow-auto'}>
            {createResult && (
              <InterviewMessage
                className={'mb-2 mr-auto'}
                background={'bg-transparent'}
                message={createResult}
                isHuman={false}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeCreate;
