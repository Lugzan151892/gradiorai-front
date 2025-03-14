import React from 'react';
import { ITech } from '@/app/(views)/(tests)/tests/interfaces';
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
  const classes = selected
    ? 'bg-main-blue text-white '
    : 'bg-gray-second text-text-gray ';
  return (
    <div
      key={tech.id}
      className={
        'flex px-2 py-[10px] rounded-lg cursor-pointer items-center h-11 text-ellipsis ' +
        classes +
        className
      }
      onClick={onClick}
    >
      <CustomCheckbox value={selected} />
      <div
        className={'ml-4 text-sm font-semibold text-nowrap truncate mw-full'}
      >
        {tech.name}
      </div>
    </div>
  );
};

export default TechComponent;
