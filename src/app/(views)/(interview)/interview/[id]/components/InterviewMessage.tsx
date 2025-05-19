import React from 'react';
import { IInterviewMessage } from '@/app/(views)/(interview)/interview/types';

const InterviewMessage: React.FC<Readonly<{ message: IInterviewMessage; className?: string }>> = ({
  message,
  className,
}) => {
  const dynamicClasses = message.type === 'USER' ? 'bg-message-blue' : 'bg-message-gray';

  return (
    <div className={`rounded-input p-4 ${dynamicClasses} ${className}`}>
      <div>{message.text}</div>
    </div>
  );
};

export default InterviewMessage;
