'use client';

import React, { useRef, useState } from 'react';

interface IFileDropzoneProps {
  onFileSelected: (file: File) => void;
  maxFileSize?: number;
  formats?: Array<string>;
}

const FileDropzone: React.FC<Readonly<IFileDropzoneProps>> = ({ onFileSelected, maxFileSize, formats }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  };
  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-6 text-center cursor-pointer rounded-md transition ${
        isDragOver ? 'bg-low-green border-low-green' : 'bg-transparent'
      }`}
    >
      <p className={'text-xl'}>Перетащите файл сюда или нажмите, чтобы выбрать</p>
      {maxFileSize ? <p className={'text-xs mt-5'}>{`Максимальный размер файла: ${maxFileSize} MB`}</p> : null}
      {formats && formats.length ? (
        <p className={'text-xs mt-1'}>{`Допустимые форматы: ${formats.map((e) => e.toUpperCase()).join(', ')}`}</p>
      ) : null}
      <input
        type={'file'}
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
};

export default FileDropzone;
