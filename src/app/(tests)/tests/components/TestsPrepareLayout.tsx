import React from 'react';

const TestsPrepareLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={'h-full flex flex-grow w-full'}>
      <div className={'my-11 mx-6 rounded-lg bg-main-blue w-full p-4'}>
        {children}
      </div>
    </div>
  );
};

export default TestsPrepareLayout;
