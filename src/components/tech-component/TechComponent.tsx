import React from 'react';
import CustomIcon from '@/components/ui/icon/CustomIcon';

interface ITechComponentProps {
  tech: { id: number; name: string };
  selected?: boolean;
  className?: string;
  children?: Readonly<React.ReactNode>;
  onClick?: () => void;
}

const TechComponent: React.FC<ITechComponentProps> = ({
  tech,
  selected = false,
  className = '',
  onClick,
  children,
}) => {
  return (
    <div
      key={tech.id}
      className={`flex px-2 py-[10px] rounded group cursor-pointer items-center h-11 text-ellipsis border border-1 
        ${selected ? 'bg-low-green border-low-green' : 'border-white hover:border-low-green group-hover:border-low-green'}
        ${className}`}
      onClick={onClick}
    >
      <div
        className={`border border-1 flex items-center p-1 mr-4 rounded 
          ${selected ? 'border-white' : 'border-white group-hover:border-low-green'}`}
      >
        <CustomIcon
          className={selected ? 'opacity-100' : 'opacity-0'}
          name={'check'}
          color={'var(--main-white)'}
          size={16}
        />
      </div>
      <div
        className={
          'mx-auto desktop:text-2xl mobile:text-base text-white text-nowrap truncate mw-full ' +
          `${selected ? '' : ' group-hover:text-low-green'}`
        }
      >
        {tech.name}
      </div>
      {children}
    </div>
  );
};

export default TechComponent;
