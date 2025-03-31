import React from 'react';

const DescriptionListItem: React.FC<{
  title?: string;
  className?: string;
}> = ({ title, className }) => {
  return (
    <div className={'desktop:px-5 mobile:px-2 desktop:py-2 border-4 bg-white rounded-2xl border-success ' + className}>
      <div className={'flex items-center w-full py-1'}>
        <div
          className={
            'border-1 border-gray rounded-full bg-white flex-shrink-0 h-4 w-4 flex items-center justify-center shadow-2xl'
          }
        >
          <div
            className={
              'rounded-full flex-shrink-0 h-5 w-5 bg-success flex items-center justify-center shadow-default shadow-black mobile:text-sm text-white'
            }
          >
            ✔
          </div>
        </div>
        {title ? (
          <div className={`ml-4 text-text-gray`}> {title} </div>
        ) : null}
      </div>
    </div>
  );
};

export default DescriptionListItem;
