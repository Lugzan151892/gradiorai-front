import React, { useRef, useState } from 'react';
import IconMarkup from '@/components/ui/icon/utils/IconMarkup';
import getIconViewBox from '@/components/ui/icon/utils';

type ICustomIconProps = {
  name: keyof typeof IconMarkup;
  color?: string;
  size?: number;
  className?: string;
  fill?: string;
  stroke?: string;
  caption?: string;
  tooltip?: string;
  onClick?: () => void;
};

const CustomIcon: React.FC<ICustomIconProps> = ({
  name,
  color = 'var(--main-gray)',
  size = 24,
  tooltip = '',
  className,
  caption,
  onClick,
}) => {
  const icon = IconMarkup[name];
  const [showTooltip, setShowTooltip] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  if (!icon) {
    return null;
  }

  return (
    <div
      className={'relative flex flex-col items-center justify-center ' + className}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={onClick}
      ref={iconRef}
    >
      <svg
        width={size}
        height={size}
        viewBox={getIconViewBox(name, size)}
        style={{ color }}
      >
        {icon}
      </svg>
      {tooltip && showTooltip && (
        <div
          className={`absolute w-max top-[${size}px] right-[10px] px-3 py-1 mobile:text-sm desktop:text-xl text-white bg-black rounded-md`}
        >
          {tooltip}
        </div>
      )}
      {caption ? <div className={'desktop:text-xl mobile:text-sm text-white'}>{caption}</div> : null}
    </div>
  );
};

export default CustomIcon;
