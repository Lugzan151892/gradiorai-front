import CustomButton from '@/components/ui/button/CustomButton';
import React from 'react';

interface IGenerateStepProps {
  title?: string;
  description?: string;
  options?: Array<{ id: number; text: string }>;
  actions?: Readonly<React.ReactNode>;
  children?: Readonly<React.ReactNode>;
  value?: number;
  step?: number;
  onClick?: (step: number) => void;
}

const GenerateStep: React.FC<IGenerateStepProps> = ({
  description,
  options,
  onClick,
  value,
  step = 0,
  actions,
  children,
}) => {
  return (
    <div className={'flex flex-col items-center align-center w-full h-full max-w-md mx-auto'}>
      <div className={'w-full mb-6 relative'}>
        <div className={'flex'}>
          <div className={'bg-main-blue h-10 w-full ml-[20px]'} />
          <div className={'bg-blue border-transparent border-[20px] border-l-[20px] border-l-main-blue'} />
        </div>
        <div className={'absolute flex w-full justify-center top-[-10px] left-0 gap-14 pr-[90px] pl-[50px]'}>
          <div
            className={
              'w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-3xl ' +
              `${step >= 1 ? 'bg-success' : 'bg-gray-second'}`
            }
          >
            1
          </div>
          <div
            className={
              'w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-3xl ' +
              `${step >= 2 ? 'bg-success' : 'bg-gray-second'}`
            }
          >
            2
          </div>
          <div
            className={
              'w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-3xl ' +
              `${step >= 3 ? 'bg-success' : 'bg-gray-second'}`
            }
          >
            3
          </div>
        </div>
      </div>
      <div className={'mb-5 text-xl text-text-gray'}>{description}</div>
      {children || (
        <div className={'w-full px-10'}>
          {options
            ? options.map((option, index) => (
                <CustomButton
                  className={`w-full ${index && 'mt-5'}`}
                  key={index}
                  text={option.text}
                  selected={option.id === value}
                  onClick={onClick ? () => onClick(option.id) : undefined}
                />
              ))
            : null}
        </div>
      )}
      <div className={'mt-auto w-full px-10'}>{actions}</div>
    </div>
  );
};

export default GenerateStep;
