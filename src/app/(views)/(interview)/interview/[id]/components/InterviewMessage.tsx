import React from 'react';

const InterviewMessage: React.FC<Readonly<{ message: string; isHuman?: boolean; className?: string }>> = ({
  message,
  isHuman,
  className,
}) => {
  const dynamicClasses = isHuman ? 'bg-message-blue' : 'bg-message-gray';

  return (
    <div className={`rounded-input p-4 ${dynamicClasses} ${className}`}>
      <div>{message}</div>
    </div>
  );
};

export default InterviewMessage;
