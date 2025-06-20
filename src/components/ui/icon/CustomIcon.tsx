import React, { useRef, useState } from 'react';
import IconMarkup from '@/components/ui/icon/utils/IconMarkup';
import getIconViewBox from '@/components/ui/icon/utils';
import { cn } from '@/lib/utils';

type ICustomIconProps = {
  name: keyof typeof IconMarkup;
  color?: string;
  size?: number;
  className?: string;
  caption?: string;
  tooltip?: string;
  disabled?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const CustomIcon: React.FC<ICustomIconProps> = ({
  name,
  color = 'var(--main-white)',
  size = 24,
  tooltip = '',
  disabled,
  className,
  onMouseEnter,
  onMouseLeave,
  caption,
  onClick,
}) => {
  const icon = IconMarkup[name];
  const [showTooltip, setShowTooltip] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const disabledClasses = 'opacity-25 pointer-events-none';

  if (!icon) {
    return null;
  }

  return (
    <div
      className={cn('relative flex flex-col items-center justify-center', className, disabled && disabledClasses)}
      onMouseEnter={() => {
        setShowTooltip(true);
        if (onMouseEnter) {
          onMouseEnter();
        }
      }}
      onMouseLeave={() => {
        setShowTooltip(false);
        if (onMouseLeave) {
          onMouseLeave();
        }
      }}
      onClick={onClick}
      ref={iconRef}
    >
      <svg
        width={size}
        height={size}
        viewBox={getIconViewBox(name)}
        style={{ color }}
        className={'fill-current'}
      >
        {icon}
      </svg>
      {tooltip && showTooltip && (
        <div
          className={`absolute w-max top-[${size}px] right-[10px] px-3 py-1 text-sm lg:text-xl text-white bg-black rounded-md`}
        >
          {tooltip}
        </div>
      )}
      {caption ? <div className={'lg:text-xl text-sm text-white'}>{caption}</div> : null}
    </div>
  );
};

export default CustomIcon;
