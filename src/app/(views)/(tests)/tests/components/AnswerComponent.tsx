import CustomIcon from '@/components/ui/icon/CustomIcon';
import { useBreakpoint } from '@/hooks/useBreakpoints';
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
  const { isMobile } = useBreakpoint();
  return (
    <div
      className={`desktop:px-10 mobile:px-4 py-2 min-h-[90px] rounded-input cursor-pointer border-1 flex items-center text-white ${showBorder ? correctClasses : 'border-white'} ${!userChoise && !disabled ? 'hover:bg-bg-transparent-50' : ''}`}
      onClick={() => (disabled || !onClick ? undefined : onClick())}
    >
      <div className={`flex h-full items-center w-full py-1 rounded-input`}>
        <div
          className={
            'rounded-full border-1 desktop:min-w-7 desktop:min-h-7 mobile:min-w-4 mobile:min-h-4 border-white flex items-center justify-center desktop:mr-10 mobile:mr-4'
          }
        >
          {showBorder && !isCorrect && (
            <CustomIcon
              name={'cross'}
              color={'var(--main-white)'}
              size={isMobile ? 15 : 25}
            />
          )}
          {isCorrect && showBorder && (
            <CustomIcon
              name={'check-small'}
              color={'var(--main-white)'}
              size={isMobile ? 15 : 25}
            />
          )}
        </div>
        <div className={'break-words break-all text-sm'}>{answer.answer}</div>
      </div>
    </div>
  );
};

export default AnswerComponent;
