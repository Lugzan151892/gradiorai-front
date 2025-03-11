import React from 'react';

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
    <g stroke={'currentColor'}>
      <path
        d={
          'M1.57143 6.4C0.703552 6.4 0 7.11634 0 8C0 8.88366 0.703552 9.6 1.57143 9.6H16.6348L13.0317 13.2686C12.418 13.8935 12.418 14.9065 13.0317 15.5314C13.6454 16.1562 14.6403 16.1562 15.254 15.5314L21.5397 9.13137C22.1534 8.50653 22.1534 7.49347 21.5397 6.86863L15.254 0.468629C14.6403 -0.15621 13.6454 -0.15621 13.0317 0.468629C12.418 1.09347 12.418 2.10653 13.0317 2.73137L16.6348 6.4H1.57143Z'
        }
        strokeWidth={'1'}
      />
    </g>
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
};

type ICustomIconProps = {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
};

const CustomIcon: React.FC<ICustomIconProps> = ({
  name,
  color = 'currentColor',
  size = 24,
  className,
  onClick,
}) => {
  const icon = icons[name];

  if (!icon) {
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={'none'}
      className={className}
      xmlns={'http://www.w3.org/2000/svg'}
      onClick={onClick}
    >
      <g transform={'scale(1)'}>
        {React.cloneElement(icon, {
          fill: color,
          stroke: color,
          transform: 'scale(1)',
        })}
      </g>
    </svg>
  );
};

export default CustomIcon;
