'use client';

import React, { useRef } from 'react';
import { useEffect, useState } from 'react';

type ColorStep = {
  percent: number;
  color: string;
  text: string;
};

interface ProgressBarProps {
  /** Текущий результат */
  score: number;
  /** Максимальный возможный результат */
  maxScore: number;
  /** Массив цветовых шагов */
  colorSteps?: ColorStep[];
  /** Длительность анимации (мс) */
  duration?: number;
}

const defaultColors = [
  {
    percent: 0,
    color: 'bg-error',
    text: 'Не расстраивайтесь — это отличная возможность улучшить свои знания! Попробуйте еще раз, у вас точно получится!',
  },
  {
    percent: 30,
    color: 'bg-yellow',
    text: 'Неплохой результат, но есть куда расти! Разберите ошибки и попробуйте снова.',
  },
  {
    percent: 80,
    color: 'bg-success',
    text: 'Отличный результат! Вы показали отличные знания и справились со всеми вопросами. Так держать!',
  },
];

const ProgressBar: React.FC<Readonly<ProgressBarProps>> = ({
  score,
  maxScore,
  colorSteps = defaultColors,
  duration = 1000,
}: ProgressBarProps) => {
  const [currentPercent, setCurrentPercent] = useState(0);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const calculatedDuration = ((score * 100) / maxScore / 100) * duration;
  const targetPercent = Math.min(100, Math.round((score / maxScore) * 100));

  const getColor = (percent: number): string => {
    let color = colorSteps[0]?.color || 'bg-white';
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

    let caption = colorSteps[0].text;
    for (const step of colorSteps) {
      if (percent >= step.percent) {
        caption = step.text;
      } else {
        break;
      }
    }

    return caption;
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

  const colorClass = getColor(currentPercent);

  return (
    <div className={'w-full flex flex-col items-center'}>
      <div className={'text-4xl mb-5'}>
        {score} из {maxScore}
      </div>
      <div className={'w-full bg-gray-200 rounded-2xl overflow-hidden shadow-inner max-w-md bg-white h-5'}>
        <div
          className={`h-full transition-colors duration-200 ${colorClass}`}
          style={{ width: `${currentPercent}%` }}
        />
      </div>
      <div className={'deskop:text-3xl mobile:text-base mt-4 text-center max-w-4xl'}>{caption()}</div>
    </div>
  );
};

export default ProgressBar;
