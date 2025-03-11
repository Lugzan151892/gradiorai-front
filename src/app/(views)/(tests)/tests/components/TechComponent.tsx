import React from 'react';
import { ITech } from '../interfaces';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';

interface ITechComponentProps {
  tech: ITech;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
}

const TechComponent: React.FC<ITechComponentProps> = ({
  tech,
  selected = false,
  className = '',
  onClick,
}) => {
  return (
    <div
      key={tech.id}
      className={
        'flex px-2 py-[10px] bg-main-blue rounded-lg cursor-pointer text-white ' +
        className
      }
      onClick={onClick}
    >
      <CustomCheckbox value={selected} />
      <div className={'ml-4 text-xl'}>{tech.name}</div>
    </div>
  );
};

export default TechComponent;
