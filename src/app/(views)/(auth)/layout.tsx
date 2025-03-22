import React from 'react';

const AuthLayout: React.FC<{
  children: Readonly<React.ReactNode>;
}> = ({ children }) => {
  return (
    <div
      className={'w-full h-full flex flex-col bg-[url("../assets/images/auth-bg.png")] bg-no-repeat bg-cover bg-left'}
    >
      <div className={'w-full h-full flex'}>
        <div className={'flex justify-center w-full items-center'}>
          <div
            className={
              'max-w-sm w-full rounded-3xl bg-transparent p-10 bg-[url("../assets/images/auth-bg.png")] bg-no-repeat bg-center bg-origin-content'
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
