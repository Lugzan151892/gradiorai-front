import { cn } from '@/lib/utils';
import React from 'react';

const AnswerComponent: React.FC<{
  answer: { answer: string; correct: boolean; id: number };
  disabled?: boolean;
  userChoise?: number;
  onClick?: () => void;
}> = ({ answer, onClick, disabled, userChoise }) => {
  const isCorrect = (userChoise === answer.id && answer.correct) || (userChoise !== answer.id && answer.correct);
  const correctClasses = isCorrect ? 'border-main-green text-main-green' : 'border-error text-error';
  const showBorder = userChoise && (userChoise === answer.id || answer.correct);
  return (
    <div
      className={cn(
        'px-4 py-2 lg:min-h-[90px] min-h-[70px] rounded-3xl border flex items-center',
        !userChoise && 'cursor-pointer',
        showBorder ? correctClasses : 'border-main-gray',
        !userChoise && !disabled && 'hover:bg-bg-transparent-50'
      )}
      onClick={() => (disabled || !onClick ? undefined : onClick())}
    >
      <div className={`flex h-full items-center w-full py-1`}>
        <div className={'rounded-full border min-w-4 min-h-4 border-white flex items-center justify-center mr-4'}>
          {userChoise === answer.id && <div className={'min-w-2 min-h-2 bg-main-white rounded-full'} />}
        </div>
        <div className={'break-words break-all text-base'}>{answer.answer}</div>
      </div>
    </div>
  );
};

export default AnswerComponent;
