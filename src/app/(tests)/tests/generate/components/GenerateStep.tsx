import CustomButton from '@/components/ui/button/CustomButton';
import { ReactNode } from 'react';

interface IGenerateStepProps {
  title?: string;
  description?: string;
  options?: Array<{ id: number; text: string }>;
  children?: ReactNode;
  onClick?: () => void;
}

const GenerateStep: React.FC<IGenerateStepProps> = ({
  children,
  title,
  description,
  options,
}) => {
  return (
    <div className="flex flex-col items-center align-center w-full">
      <div>{title}</div>
      <div>{description}</div>
      {options
        ? options.map((option, index) => (
            <CustomButton key={index} text={option.text} />
          ))
        : null}
    </div>
  );
};

export default GenerateStep;
