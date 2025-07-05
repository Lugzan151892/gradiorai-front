'use client';

import React, { useRef, useState } from 'react';
import CustomIcon from '../icon/CustomIcon';
import UILabel from '../label/UILabel';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/core/utils/files';

const BYTES_IN_MB = 1024 * 1024;

interface IFileDropzoneProps {
  onFileSelected: (file: File | null) => void;
  maxFileSize?: number;
  className?: string;
  label?: string;
  file?: File | null;
  error?: string[] | string;
  id?: string;
  formats?: Array<string>;
}

const FileDropzone: React.FC<Readonly<IFileDropzoneProps>> = ({
  onFileSelected,
  maxFileSize,
  formats,
  file,
  className,
  error,
  label,
  id,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [insideErrors, setInsideErrors] = useState<Array<string>>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  function getFileExtension(filename: string): string | null {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) return null;
    return filename.slice(lastDotIndex + 1).toLowerCase();
  }

  const getInsideErrors = (file: File) => {
    const errorType = formats && !formats.includes(getFileExtension(file.name) || '') ? 'Неверный формат файла' : '';
    const errorSize = maxFileSize && file.size > maxFileSize * BYTES_IN_MB ? 'Размер файла превышает допустимый' : '';

    return [errorType, errorSize].filter(Boolean);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      const errors = getInsideErrors(e.dataTransfer.files[0]);

      if (errors.length) {
        setInsideErrors(errors);

        return;
      }
      onFileSelected(e.dataTransfer.files[0]);
      setInsideErrors([]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const errors = getInsideErrors(e.target.files[0]);

      if (errors.length) {
        setInsideErrors(errors);

        return;
      }

      onFileSelected(e.target.files[0]);
      setInsideErrors([]);
      e.target.value = '';
    }
  };

  const errorsList = Array.isArray(error)
    ? [...insideErrors, ...error]
    : error
      ? [...insideErrors, error]
      : insideErrors;

  const borderClasses = errorsList.length ? 'border-error' : 'border-main-gray';

  return (
    <div className={cn(className, 'flex flex-col w-full')}>
      {label && (
        <UILabel
          className={'mb-2'}
          htmlFor={id}
        >
          {label}
        </UILabel>
      )}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-main-dark p-4 text-center cursor-pointer rounded-3xl transition w-full ${
          isDragOver ? 'bg-low-green border-low-green' : ''
        }`}
      >
        <div className={cn('border-1 border-dashed flex flex-col items-center p-4 text-text-disabled', borderClasses)}>
          <p className={'text-sm mb-8'}>Перетащите файл сюда или нажмите, чтобы выбрать</p>
          <div className={'h-15 w-15 rounded-full border-main-gray border-1 flex items-center justify-center mb-8'}>
            <CustomIcon
              name={file ? 'document-ready' : 'document-upload'}
              size={32}
            />
          </div>
          {file && <p className={'text-xs mb-2'}>{`${file.name} ${formatFileSize(file.size)}`}</p>}
          {file && (
            <div
              className={'flex gap-2 items-center'}
              onClick={(e) => {
                e.stopPropagation();
                onFileSelected(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              <CustomIcon
                name={'close-circle'}
                color={'var(--main-error)'}
              />
              <div className={'text-xs'}>Удалить</div>
            </div>
          )}
          {maxFileSize && !file ? (
            <p className={'text-xs mb-2'}>{`Максимальный размер файла: ${maxFileSize} Mb`}</p>
          ) : null}
          {!file && formats && formats.length ? (
            <p className={'text-xs mt-1'}>{`Допустимые форматы: ${formats.map((e) => e.toUpperCase()).join(', ')}`}</p>
          ) : null}
          <input
            type={'file'}
            id={id}
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
        </div>
      </div>
      <div className={'min-h-4'}>
        {!!errorsList.length && (
          <div className={'mt-2 text-xs text-error flex flex-col items-start'}>
            {errorsList.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
