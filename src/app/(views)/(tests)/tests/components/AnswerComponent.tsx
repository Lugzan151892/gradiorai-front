import CustomIcon from '@/components/ui/icon/CustomIcon';
import React from 'react';

const AnswerComponent: React.FC<{
  answer: { answer: string; correct: boolean; id: number };
  disabled?: boolean;
  userChoise?: number;
  onClick?: () => void;
}> = ({ answer, onClick, disabled, userChoise }) => {
  const isCorrect = (userChoise === answer.id && answer.correct) || (userChoise !== answer.id && answer.correct);
  const correctClasses = isCorrect ? 'border-low-green bg-low-green' : 'border-error bg-error';
  const showBorder = userChoise && (userChoise === answer.id || answer.correct);
  return (
    <div
      className={`desktop:px-10 mobile:px-2 desktop:py-7 rounded-input cursor-pointer border-1 text-white ${showBorder ? correctClasses : 'border-white'} ${!userChoise && !disabled ? 'hover:bg-bg-transparent-50' : ''}`}
      onClick={() => (disabled || !onClick ? undefined : onClick())}
    >
      <div className={`flex items-center w-full py-1 rounded-input`}>
        <div
          className={
            'rounded-full border-1 min-w-7 min-h-7 h-7 w-7 border-white flex items-center justify-center mr-10'
          }
        >
          {showBorder && !isCorrect && (
            <CustomIcon
              name={'cross'}
              color={'var(--main-white)'}
              size={20}
            />
          )}
          {isCorrect && showBorder && (
            <CustomIcon
              name={'check-small'}
              color={'var(--main-white)'}
              size={20}
            />
          )}
        </div>
        <div>{answer.answer}</div>
      </div>
    </div>
  );
};

export default AnswerComponent;
