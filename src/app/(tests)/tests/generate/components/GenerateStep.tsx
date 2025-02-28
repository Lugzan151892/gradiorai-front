import CustomButton from '@/components/ui/button/CustomButton';
import { ReactNode } from 'react';

interface IGenerateStepProps {
  title?: string;
  description?: string;
  options?: Array<{ id: number; text: string }>;
  children?: ReactNode;
  value?: number;
  onClick?: (step: number) => void;
}

const GenerateStep: React.FC<IGenerateStepProps> = ({
  title,
  description,
  options,
  onClick,
  value
}) => {
  return (
    <div className="flex flex-col items-center align-center w-full">
      <div className='text-3xl mb-1'>{title}</div>
      <div className='mb-5 text-xl'>{description}</div>
      {options
        ? options.map((option, index) => (
            <CustomButton className={`w-full ${index && 'mt-1'}`} key={index} text={option.text} selected={option.id === value} onClick={onClick ? () => onClick(option.id) : undefined} />
          ))
        : null}
    </div>
  );
};

export default GenerateStep;
