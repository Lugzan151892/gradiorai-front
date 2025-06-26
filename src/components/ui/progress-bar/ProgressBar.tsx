'use client';

import React, { useEffect, useRef, useState } from 'react';

type ColorStep = {
  percent: number;
  color: string;
  text: string;
};

interface ProgressBarProps {
  score: number;
  maxScore: number;
  colorSteps?: ColorStep[];
  duration?: number;
}

const defaultColors: ColorStep[] = [
  {
    percent: 0,
    color: 'text-main-gray stroke-main-gray',
    text: 'Не расстраивайтесь — это отличная возможность улучшить свои знания! Попробуйте еще раз, у вас точно получится!',
  },
  {
    percent: 5,
    color: 'text-main-purple stroke-main-purple',
    text: 'Не расстраивайтесь — это отличная возможность улучшить свои знания! Попробуйте еще раз, у вас точно получится!',
  },
  {
    percent: 30,
    color: 'text-main-purple stroke-main-purple',
    text: 'Неплохой результат, но есть куда расти! Разберите ошибки и попробуйте снова.',
  },
  {
    percent: 80,
    color: 'text-main-purple stroke-main-purple',
    text: 'Отличный результат! Вы показали отличные знания и справились со всеми вопросами. Так держать!',
  },
];

const ProgressBar: React.FC<ProgressBarProps> = ({ score, maxScore, colorSteps = defaultColors, duration = 1000 }) => {
  const [currentPercent, setCurrentPercent] = useState(0);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const targetPercent = Math.min(100, Math.round((score / maxScore) * 100));
  const calculatedDuration = (targetPercent / 100) * duration;

  const getColor = (percent: number): string => {
    let color = colorSteps[0]?.color || 'stroke-white';
    for (const step of colorSteps) {
      if (percent >= step.percent) {
        color = step.color;
      } else {
        break;
      }
    }
    return color;
  };

  const caption = () => {
    const percent = Math.round((score * 100) / maxScore);
    let text = colorSteps[0]?.text || '';
    for (const step of colorSteps) {
      if (percent >= step.percent) {
        text = step.text;
      } else {
        break;
      }
    }
    return text;
  };

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / calculatedDuration, 1);
      const newPercent = Math.floor(progress * targetPercent);
      setCurrentPercent(newPercent);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetPercent, calculatedDuration]);

  const strokeDashoffset = circumference - (currentPercent / 100) * circumference;

  const colorClass = getColor(currentPercent);

  return (
    <div className={'flex flex-col items-center space-y-4'}>
      <div className={'relative w-40 h-40'}>
        <svg
          width={'100%'}
          height={'100%'}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          <circle
            stroke={'var(--main-gray)'}
            fill={'transparent'}
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            className={`${colorClass} transition-colors duration-200`}
            fill={'transparent'}
            strokeWidth={stroke}
            strokeLinecap={'round'}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className={'absolute inset-0 flex items-center justify-center text-lg font-medium'}>
          <div
            className={'py-2 px-4 rounded-3xl'}
            style={{ background: 'var(--main-gradient)' }}
          >
            {score} / {maxScore}
          </div>
        </div>
      </div>
      <div className={'text-center text-base lg:text-xl px-4'}>{caption()}</div>
    </div>
  );
};

export default ProgressBar;
