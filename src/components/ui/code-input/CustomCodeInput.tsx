import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/CustomCodeInput.module.css';

const CustomCodeInput: React.FC<{
  error?: boolean;
  length?: number;
  value?: string;
  className?: string;
  valueType?: 'letters' | 'numbers';
  noTooltip?: boolean;
  onInput?: (val: string) => void;
}> = ({ error = false, length = 4, value = '', className = '', noTooltip, valueType = 'numbers', onInput }) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(!!error);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (!inputRef.current) return;

    inputRef.current.focus();
  };

  const isOnlyNumbers = (str: string) => {
    return /^\d+$/.test(str);
  };

  const isOnlyLetters = (str: string) => {
    return /^[A-Za-z]+$/.test(str);
  };

  const isFieldActive = (fieldIndex: number) => {
    if (!inputFocused) return false;
    if (!value.length) return fieldIndex === 0;
    if (value.length === length) return fieldIndex === length - 1;

    return fieldIndex === value.length;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInput) {
      if (valueType === 'letters' && !isOnlyLetters(e.target.value)) {
        return;
      }

      if (valueType === 'numbers' && !isOnlyNumbers(e.target.value)) {
        return;
      }

      onInput(e.target.value);
    }
  };

  useEffect(() => {
    if (error) {
      setShowTooltip(true);
    }
  }, [error]);

  return (
    <section className={'relative ' + className}>
      <div className={'flex gap-4'}>
        {new Array(length)
          .fill(0)
          .map((_, iEl) => iEl + 1)
          .map((_, iEl) => (
            <div
              key={iEl}
              className={`w-12 border-2 border-white bg-white rounded-xl h-12 flex flex-col items-center ${error ? 'border-error bg-error' : ''}`}
              onClick={handleFocus}
            >
              <div className={`mt-1 text-3xl max-h-8 ${error ? 'text-error' : ''}`}>{value[iEl]}</div>
              <div className={'grow'} />
              <div
                className={
                  'min-h-1 min-w-2 mb-1 border-2 border-black opacity-0 justify-self-end' +
                  ` ${error ? 'border-error' : ''}` +
                  ` ${isFieldActive(iEl) ? styles['input__item__line--active'] : ''}`
                }
              />
            </div>
          ))}
      </div>
      {error && !noTooltip && showTooltip && (
        <div
          className={
            'absolute left-2 top-14 mt-1 bg-white text-red-600 shadow-lg rounded text-sm w-max max-w-48 p-2 z-10'
          }
        >
          <div className={'absolute -top-1 left-3 w-3 h-3 bg-white transform rotate-45'} />
          <div className={'flex items-center gap-2'}>
            <span className={'text-xs'}>Введен неверный код</span>
          </div>
        </div>
      )}
      {noTooltip && (
        <div className={'text-error flex flex-col text-center mt-1 ' + `${error ? '' : 'opacity-0'}`}>
          <p className={'text-xs'}>Введен неверный код</p>
        </div>
      )}
      <input
        ref={inputRef}
        className={'absolute opacity-0 pointer-events-none -z-50'}
        maxLength={length}
        onInput={handleInput}
        value={value}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
    </section>
  );
};

export default CustomCodeInput;
