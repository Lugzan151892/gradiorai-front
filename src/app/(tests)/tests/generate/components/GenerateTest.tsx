import CustomRadioButton from '@/components/ui/radio-button/CustomRadioButton';
import React from 'react';

const GenerateTest: React.FC<{
  tests: Array<{
    question: string;
    responses: Array<{ answer: string; correct: boolean }>;
  }>;
}> = () => {
  return (
    <div className={'h-full flex flex-grow w-full'}>
      <div className={'my-7 mx-3 rounded-lg bg-gray w-full p-4'}>
        <div className={'flex gap-4'}>
          <div
            className={
              'h-24 w-24 bg-aqua rounded flex items-center justify-center text-xl text-text-secondary'
            }
          >
            1/30
          </div>
          <div
            className={
              'w-full flex items-center bg-white rounded text-black p-3 text-2xl'
            }
          >
            tut question
          </div>
        </div>
        <div className={'flex flex-col mt-3'}>
          <div className={'px-10 py-3 bg-white rounded hover:shadow-2xl'}>
            <CustomRadioButton caption={'Процесс написания кода'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateTest;
