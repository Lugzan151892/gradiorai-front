import React from 'react';

const TestsPrepareLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <div
      className={
        'flex justify-items-end w-full overflow-y-hidden'
      }
    >
      <div
        className={
          'w-full ml-auto desktop:max-w-[40%] w-full desktop:my-7 desktop:mr-3 rounded-lg p-4 text-black overflow-x-hidden overflow-y-auto'
        }
      >
        {children}
      </div>
    </div>
  );
};

export default TestsPrepareLayout;
