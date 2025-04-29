import React from 'react';
import smallCheck from '@/assets/icons/small-check.svg';
import Image from 'next/image';

interface ITechComponentProps {
  tech: { id: number; name: string };
  selected?: boolean;
  className?: string;
  children?: Readonly<React.ReactNode>;
  small?: boolean;
  onClick?: () => void;
}

const TechComponent: React.FC<ITechComponentProps> = ({
  tech,
  selected = false,
  className = '',
  small,
  onClick,
  children,
}) => {
  return (
    <div
      key={tech.id}
      className={`flex px-2 py-[10px] rounded group cursor-pointer items-center text-ellipsis border border-1 
        ${selected ? 'bg-low-green border-low-green' : 'border-white hover:border-low-green group-hover:border-low-green'}
        ${small ? 'h-7 min-h-7 ' : 'h-10 min-h-10 '}
        ${className}`}
      onClick={onClick}
    >
      <div
        className={`border border-1 flex items-center p-1 mr-4 rounded h-4 w-4 min-h-4 min-w-4 
          ${selected ? 'border-white' : 'border-white group-hover:border-low-green'}`}
      >
        <Image
          className={selected ? 'opacity-100' : 'opacity-0'}
          src={smallCheck}
          alt={'check'}
        />
      </div>
      <div
        className={
          'mx-auto text-white text-nowrap truncate mw-full ' +
          `${selected ? '' : ' group-hover:text-low-green'}` +
          `${small ? ' text-sm' : ' desktop:text-2xl mobile:text-base'}`
        }
      >
        {tech.name}
      </div>
      {children}
    </div>
  );
};

export default TechComponent;
