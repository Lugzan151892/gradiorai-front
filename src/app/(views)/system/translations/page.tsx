'use client';

import UIButton from '@/components/ui/button/UIButton';
import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import routeChecker from '@/hoc/routeChecker';
import { useAppDispatch } from '@/hooks/redux';
import { openModal } from '@/store/tech/techSlice';
import React, { useState } from 'react';

const AdminTransactions = () => {
  const dispatch = useAppDispatch();

  const [localesJson, setLocalesJson] = useState<null | File>(null);

  const downloadFile = async () => {
    try {
      dispatch(setLoading(true));
      await Api.download('/translations/export', 'locales');
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadFile = async () => {
    try {
      dispatch(setLoading(true));
      await Api.postFormData('/translations/import', { file: localesJson });
      dispatch(
        openModal({
          text: 'Переводы успешно обновлены!',
          type: 'success',
        })
      );

      setLocalesJson(null);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'flex items-center justify-center mb-5'}>
        <div className={'text-5xl'}>Файлы текстов</div>
      </div>
      <div className={'flex flex-col items-center bg-main-black p-4 rounded-xl'}>
        <UIButton
          className={'ml-2'}
          text={'Скачать файл переводов'}
          onClick={() => downloadFile()}
        />
        <FileDropzone
          className={'mt-4'}
          label={'Файл переводов'}
          file={localesJson}
          formats={['json']}
          onFileSelected={setLocalesJson}
        />
        <UIButton
          className={'mt-2'}
          disabled={!localesJson}
          text={'Загрузить файл переводов'}
          onClick={() => loadFile()}
        />
      </div>
    </div>
  );
};

export default routeChecker(AdminTransactions, 'adminOnly');
