import CustomRadioButton from '@/components/ui/radio-button/CustomRadioButton';
import React from 'react';

const AnswerComponent: React.FC<{
  answer: { answer: string; correct: boolean; id: number };
  disabled?: boolean;
  userChoise?: number;
  onClick?: () => void;
}> = ({ answer, onClick, disabled, userChoise }) => {
  const disabledClasses = disabled ? 'opacity-40' : 'cursor-pointer';
  const correctClasses =
    userChoise === answer.id ? 'border-success' : 'border-error';
  const showBorder = userChoise && (userChoise === answer.id || answer.correct);
  return (
    <div
      className={`px-10 py-3 border-2 bg-white rounded ${disabledClasses} ${showBorder ? correctClasses : 'border-transparent'} ${!userChoise && !disabled ? 'hover:shadow-2xl' : ''}`}
      onClick={() => (disabled || !onClick ? undefined : onClick())}
    >
      <CustomRadioButton
        caption={answer.answer}
        selected={!!userChoise && userChoise === answer.id}
        noPointer
      />
    </div>
  );
};

export default AnswerComponent;
