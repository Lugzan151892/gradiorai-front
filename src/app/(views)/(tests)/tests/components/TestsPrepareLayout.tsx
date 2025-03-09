import React from 'react';
// import bg from '../../../../../assets/images/tests-bg.png';

const TestsPrepareLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className={
        'h-full flex justify-items-end w-full desktop:bg-[url("../../../../../assets/images/tests-bg.png")] bg-no-repeat bg-contain bg-left'
      }
    >
      <div
        className={
          'ml-auto max-w-[40%] w-full my-7 mr-3 rounded-lg p-4 text-black'
        }
      >
        {children}
      </div>
    </div>
  );
};

export default TestsPrepareLayout;
