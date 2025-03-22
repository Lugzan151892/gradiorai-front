import React, { useRef, useState } from 'react';

const icons = {
  'arrow-left': (
    <path
      d={
        'M20.4286 9.6C21.2964 9.6 22 8.88366 22 8C22 7.11634 21.2964 6.4 20.4286 6.4H5.36519L8.96831 2.73137C9.58199 2.10653 9.58199 1.09347 8.96831 0.468629C8.35463 -0.15621 7.35966 -0.15621 6.74597 0.468629L0.460258 6.86863C-0.153423 7.49347 -0.153423 8.50653 0.460258 9.13137L6.74597 15.5314C7.35966 16.1562 8.35463 16.1562 8.96831 15.5314C9.58199 14.9065 9.58199 13.8935 8.96831 13.2686L5.36519 9.6H20.4286Z'
      }
      strokeWidth={'1'}
    />
  ),
  'arrow-right': (
    <path
      d={
        'M1.57143 6.4C0.703552 6.4 0 7.11634 0 8C0 8.88366 0.703552 9.6 1.57143 9.6H16.6348L13.0317 13.2686C12.418 13.8935 12.418 14.9065 13.0317 15.5314C13.6454 16.1562 14.6403 16.1562 15.254 15.5314L21.5397 9.13137C22.1534 8.50653 22.1534 7.49347 21.5397 6.86863L15.254 0.468629C14.6403 -0.15621 13.6454 -0.15621 13.0317 0.468629C12.418 1.09347 12.418 2.10653 13.0317 2.73137L16.6348 6.4H1.57143Z'
      }
      strokeWidth={'1'}
    />
  ),
  cross: (
    <g stroke={'currentColor'}>
      <path
        d={'M6 6L18 18'}
        strokeWidth={'2'}
        strokeLinecap={'round'}
      />
      <path
        d={'M18 6L6 18'}
        strokeWidth={'2'}
        strokeLinecap={'round'}
      />
    </g>
  ),
  login: (
    <path
      d={
        'M16.642 20.669c-0.391 0.39-0.391 1.023-0 1.414 0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293l5.907-6.063-5.907-6.063c-0.39-0.39-1.023-0.39-1.414 0s-0.391 1.024 0 1.414l3.617 3.617h-19.264c-0.552 0-1 0.448-1 1s0.448 1 1 1h19.326zM30.005 0h-18c-1.105 0-2.001 0.895-2.001 2v9h2.014v-7.78c0-0.668 0.542-1.21 1.21-1.21h15.522c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-15.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.014 0.003v9.030c0 1.105 0.896 2 2.001 2h18c1.105 0 2-0.895 2-2v-28c-0.001-1.105-0.896-2-2-2z'
      }
    />
  ),
  user: (
    <g fill={'currentColor'}>
      <path
        d={'M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z'}
      />
      <path d={'M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z'} />
    </g>
  ),
  password: (
    <g stroke={'currentColor'}>
      <path
        d={
          'M39,18H35V13A11,11,0,0,0,24,2H22A11,11,0,0,0,11,13v5H7a2,2,0,0,0-2,2V44a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V20A2,2,0,0,0,39,18ZM15,13a7,7,0,0,1,7-7h2a7,7,0,0,1,7,7v5H15ZM37,42H9V22H37Z'
        }
      />
      <circle
        cx={'15'}
        cy={'32'}
        r={'3'}
      />
      <circle
        cx={'23'}
        cy={'32'}
        r={'3'}
      />
      <circle
        cx={'31'}
        cy={'32'}
        r={'3'}
      />
    </g>
  ),
  youtube: (
    <path
      d={'M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z'}
    />
  ),
};

type ICustomIconProps = {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  className?: string;
  caption?: string;
  tooltip?: string;
  onClick?: () => void;
};

const CustomIcon: React.FC<ICustomIconProps> = ({
  name,
  color = 'currentColor',
  size = 24,
  tooltip = '',
  className,
  caption,
  onClick,
}) => {
  const icon = icons[name];

  const [showTooltip, setShowTooltip] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const getViewBox = () => {
    switch (name) {
      case 'arrow-left':
        return '0 0 22 16';
      case 'arrow-right':
        return '0 0 22 16';
      case 'cross':
        return `0 0 ${size} ${size}`;
      case 'login':
        return '0 0 32 32';
      case 'user':
        return '0 0 16 16';
      case 'password':
        return '0 0 44 48';
      case 'youtube':
        return '0 0 24 24';
      default:
        return `0 0 ${size} ${size}`;
    }
  };

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
        viewBox={getViewBox()}
        fill={'none'}
      >
        {React.cloneElement(icon, {
          fill: color,
          stroke: color,
          width: '100%',
          height: '100%',
        })}
      </svg>
      {tooltip && showTooltip && (
        <div
          className={`absolute w-max top-[${size}px] right-[10px] px-3 py-1 mobile:text-sm desktop:text-xl text-white bg-black rounded-md`}
        >
          {tooltip}
        </div>
      )}
      {caption ? <div className={'text-xl text-white'}>{caption}</div> : null}
    </div>
  );
};

export default CustomIcon;
