import React from 'react';
import CustomRadioButton from '../ui/radio-button/CustomRadioButton';

const DescriptionListItem: React.FC<{
  title?: string;
  className?: string;
}> = ({ title, className }) => {
  return (
    <div className={'desktop:px-5 mobile:px-2 desktop:py-2 border-4 bg-white rounded-2xl border-success ' + className}>
      <CustomRadioButton
        caption={title}
        type={'success'}
        selected
        textLarge
        noPointer
      />
    </div>
  );
};

export default DescriptionListItem;
