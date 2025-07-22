import UIAccordion from '@/components/ui/accordion/UIAccordion';
import React from 'react';

interface IAccordionBlockProps {
  title: string;
  content: string;
}

const AboutBlock: React.FC<Readonly<IAccordionBlockProps>> = ({ title, content }) => {
  return (
    <div>
      <UIAccordion title={title}>
        <div className={'lg:text-lg text-sm font-light italic text-text-disabled max-w-[60%]'}>{content}</div>
      </UIAccordion>
    </div>
  );
};

export default AboutBlock;
