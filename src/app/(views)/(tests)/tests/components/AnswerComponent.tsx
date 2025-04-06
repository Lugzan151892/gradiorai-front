import React from 'react';
import CustomRadioButton from '@/components/ui/radio-button/CustomRadioButton';

const AnswerComponent: React.FC<{
  answer: { answer: string; correct: boolean; id: number };
  disabled?: boolean;
  userChoise?: number;
  onClick?: () => void;
}> = ({ answer, onClick, disabled, userChoise }) => {
  const correctClasses =
    (userChoise === answer.id && answer.correct) || (userChoise !== answer.id && answer.correct)
      ? 'border-success'
      : 'border-error';
  const showBorder = userChoise && (userChoise === answer.id || answer.correct);
  return (
    <div
      className={`desktop:px-10 mobile:px-2 desktop:py-3 rounded-input cursor-pointer text-white ${showBorder ? correctClasses : 'border-transparent'} ${!userChoise && !disabled ? 'hover:shadow-2xl' : ''}`}
      onClick={() => (disabled || !onClick ? undefined : onClick())}
    >
      <CustomRadioButton
        caption={answer.answer}
        disabled={disabled}
        selected={!!userChoise && userChoise === answer.id}
        noPointer
      />
    </div>
  );
};

export default AnswerComponent;
