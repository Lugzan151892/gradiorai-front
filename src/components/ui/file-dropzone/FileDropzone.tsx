'use client';

import React, { useRef, useState } from 'react';
import CustomIcon from '../icon/CustomIcon';
import UILabel from '../label/UILabel';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/core/utils/files';
import { IFile } from '@/core/interfaces/types';

const BYTES_IN_MB = 1024 * 1024;

interface IFileDropzoneProps {
  onFileSelected: (file: File | null) => void;
  maxFileSize?: number;
  className?: string;
  label?: string;
  file?: IFile | File | null;
  filePath?: string; // для файла из БД, если нужно прямой путь
  error?: string[] | string;
  id?: string;
  formats?: Array<string>;
}

const FileDropzone: React.FC<IFileDropzoneProps> = ({
  onFileSelected,
  maxFileSize,
  formats,
  file,
  filePath,
  className,
  error,
  label,
  id,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [insideErrors, setInsideErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const getFileExtension = (filename: string) => {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex === -1 ? null : filename.slice(lastDotIndex + 1).toLowerCase();
  };

  const getInsideErrors = (f: File) => {
    const errorType = formats && !formats.includes(getFileExtension(f.name) || '') ? 'Неверный формат файла' : '';
    const errorSize = maxFileSize && f.size > maxFileSize * BYTES_IN_MB ? 'Размер файла превышает допустимый' : '';
    return [errorType, errorSize].filter(Boolean);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    const errors = getInsideErrors(droppedFile);
    if (errors.length) {
      setInsideErrors(errors);
      return;
    }
    onFileSelected(droppedFile);
    setInsideErrors([]);
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const errors = getInsideErrors(selectedFile);
    if (errors.length) {
      setInsideErrors(errors);
      return;
    }
    onFileSelected(selectedFile);
    setInsideErrors([]);
    e.target.value = '';
  };

  const errorsList = Array.isArray(error)
    ? [...insideErrors, ...error]
    : error
      ? [...insideErrors, error]
      : insideErrors;

  const borderClasses = errorsList.length ? 'border-error' : 'border-main-gray';

  const isNewFile = file instanceof File;
  const isDbFile = file && !(file instanceof File);
  const fileName = isNewFile ? file?.name : isDbFile ? (file as IFile).originalName : '';
  const fileSize = isNewFile ? file?.size : isDbFile ? (file as IFile).size : 0;
  const fileLink = isNewFile ? URL.createObjectURL(file as File) : isDbFile ? filePath || (file as IFile).path : '';

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
          <p className={'text-sm mb-8'}>{file ? 'Файл добавлен' : 'Перетащите файл сюда или нажмите, чтобы выбрать'}</p>
          <div className={'h-15 w-15 rounded-full border-main-gray border-1 flex items-center justify-center mb-8'}>
            <CustomIcon
              name={file ? 'document-ready' : 'document-upload'}
              size={32}
            />
          </div>
          {file && (
            <a
              className={'text-xs mb-2 cursor-pointer hover:underline hover:text-main-purple'}
              target={'_blank'}
              href={fileLink}
              rel={'noreferrer'}
              download={fileName || undefined}
              onClick={(e) => e.stopPropagation()} // чтобы не триггерить fileInput
            >
              {`${fileName} (${formatFileSize(fileSize)})`}
            </a>
          )}
          {file && (
            <div
              className={'flex gap-2 items-center'}
              onClick={(e) => {
                e.stopPropagation();
                onFileSelected(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
            >
              <CustomIcon
                name={'close-circle'}
                color={'var(--main-error)'}
              />
              <div className={'text-xs'}>Удалить</div>
            </div>
          )}
          {maxFileSize && !file && <p className={'text-xs mb-2'}>{`Максимальный размер файла: ${maxFileSize} Mb`}</p>}
          {!file && formats?.length ? (
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

      {errorsList.length > 0 && (
        <div className={'mt-2 text-xs text-error flex flex-col items-start'}>
          {errorsList.map((e) => (
            <span key={e}>{e}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
