import React, { useRef, useState } from 'react';
import CustomIcon from '@/components/ui/icon/CustomIcon';

interface AccordionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
}

const UIAccordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={'border border-main-gray rounded-3xl overflow-hidden shadow-sm p-4'}>
      <button
        onClick={toggleAccordion}
        className={'w-full text-left transition-colors duration-300 font-semibold cursor-pointer'}
      >
        <div className={'flex items-center justify-between'}>
          <span className={'lg:text-xl text-base'}>{title}</span>
          <div className={'border border-main-gray rounded-full'}>
            <CustomIcon
              name={'menu-arrow'}
              color={'var(--color-main-purple)'}
              size={32}
              className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      <div
        ref={contentRef}
        style={{
          height: isOpen ? contentRef.current?.scrollHeight : 0,
        }}
        className={'transition-all duration-300 ease-in-out overflow-hidden'}
      >
        <div className={'pt-4'}>{children}</div>
      </div>
    </div>
  );
};

export default UIAccordion;
