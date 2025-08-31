'use client';

import UIButton from '@/components/ui/button/UIButton';
import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import UIInput from '@/components/ui/input/UIInput';
import UISelect from '@/components/ui/select/UISelect';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import routeChecker from '@/hoc/routeChecker';
import { useAppDispatch } from '@/hooks/redux';
import { TLocale, TNameSpace } from '@/i18n/interfaces/locale';
import { openModal } from '@/store/tech/techSlice';
import React, { useState } from 'react';

const AdminTransactions = () => {
  const dispatch = useAppDispatch();

  const [localesJson, setLocalesJson] = useState<null | File>(null);
  const [namespace, setNamespace] = useState<TNameSpace>('common');
  const [locale, setLocale] = useState<TLocale>('ru');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const namespacesOptions: Array<{
    id: TNameSpace;
    text: TNameSpace;
  }> = [
    {
      id: 'common',
      text: 'common',
    },
    {
      id: 'main',
      text: 'main',
    },
    {
      id: 'profile',
      text: 'profile',
    },
    {
      id: 'interview',
      text: 'interview',
    },
    {
      id: 'tests',
      text: 'tests',
    },
  ];

  const localeOptions: Array<{
    id: TLocale;
    text: TLocale;
  }> = [
    {
      id: 'ru',
      text: 'ru',
    },
    {
      id: 'en',
      text: 'en',
    },
  ];

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

  const save = async () => {
    if (!key || !value) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.patch('/translations/update', { locale, namespace, key, value });
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
        <div className={'mt-2'}>
          <div>Добавить перевод:</div>
          <div className={'flex items-center gap-2'}>
            <UISelect
              options={namespacesOptions}
              value={namespace}
              onChange={(e) => setNamespace(e as TNameSpace)}
            />
            <UISelect
              options={localeOptions}
              value={locale}
              onChange={(e) => setLocale(e as TLocale)}
            />
            <UIInput
              label={'Ключ'}
              value={key}
              level={'square'}
              onInput={setKey}
            />
            <UIInput
              label={'Значение'}
              level={'square'}
              value={value}
              onInput={setValue}
            />
            <UIButton
              text={'Сохранить'}
              disabled={!key || !locale}
              onClick={save}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default routeChecker(AdminTransactions, 'adminOnly');
