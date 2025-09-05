'use client';

import React, { useState } from 'react';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import Api from '@/core/api/api';
import UIButton from '@/components/ui/button/UIButton';
import UILabel from '@/components/ui/label/UILabel';
import UITextarea from '@/components/ui/textarea/UITextarea';
import MarkdownMessage from '@/components/markdown-message/MarkdownMessage';
import { Trans } from '@/i18n/Trans';

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
    <section className={'w-full lg:px-10 flex flex-col pb-3'}>
      <div
        className={'lg:h-[198px] rounded-b-4xl flex flex-col justify-center items-center mb-6 px-4 lg:py-auto py-14'}
        style={{ background: 'var(--main-gradient)' }}
      >
        <div className={'w-full lg:max-w-[808px] flex flex-col gap-6 text-center'}>
          <div className={'lg:text-5xl text-4xl leading-[100%] font-bold'}>
            <Trans
              ns={'common'}
              k={'common_create_cv'}
            />
          </div>
          <div className={'lg:text-xl text-base'}>
            <Trans
              ns={'interview'}
              k={'interview_create_cv_description'}
            />
          </div>
        </div>
      </div>
      <div className={'p-6 bg-main-black rounded-3xl flex flex-col gap-3 text-center mx-2 flex-1'}>
        <div className={'flex flex-col'}>
          <UITextarea
            className={'mt-6'}
            id={'user-description'}
            label={
              <Trans
                ns={'interview'}
                k={'interview_create_cv_about'}
              />
            }
            hint={
              <Trans
                ns={'interview'}
                k={'interview_create_cv_about_description'}
              />
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
            >
              {!!createResult ? (
                <Trans
                  ns={'interview'}
                  k={'interview_check_cv_clear'}
                />
              ) : (
                <Trans
                  ns={'interview'}
                  k={'interview_create_cv_prepare_resume'}
                />
              )}
            </UIButton>
          </div>
        </div>
        <div className={'flex flex-col'}>
          <UILabel className={'mb-2'}>
            <Trans
              ns={'interview'}
              k={'interview_create_cv_result'}
            />
          </UILabel>
          <div className={'bg-main-dark p-4 text-center rounded-3xl min-h-[300px] max-h-[400px] overflow-auto'}>
            {createResult && (
              <MarkdownMessage
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
