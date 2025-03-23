import React, { useRef, useState } from 'react';
import styles from './styles/CustomCodeInput.module.css';

const CustomCodeInput: React.FC<{
  error?: boolean;
  length?: number;
  value?: string;
  className?: string;
  onInput?: (val: string) => void;
}> = ({ error = false, length = 4, value = '', className = '', onInput }) => {
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (!inputRef.current) return;

    inputRef.current.focus();
  };

  const isFieldActive = (fieldIndex: number) => {
    if (!inputFocused) return false;
    if (!value.length) return fieldIndex === 0;
    if (value.length === length) return fieldIndex === length - 1;

    return fieldIndex === value.length;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInput) {
      onInput(e.target.value);
    }
  };

  return (
    <section className={className}>
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
      <div className={'text-error flex flex-col text-center mt-1 ' + `${error ? '' : 'opacity-0'}`}>
        <p className={'text-xs'}>Введен неверный код</p>
      </div>
      <input
        ref={inputRef}
        className={'opacity-0 h-0 w-0'}
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
