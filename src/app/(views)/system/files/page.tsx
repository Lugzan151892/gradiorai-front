'use client';

import UIButton from '@/components/ui/button/UIButton';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import routeChecker from '@/hoc/routeChecker';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import UpdateFileModal from '@/app/(views)/system/files/components/UpdateFileModal';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { normalizeServerDate } from '@/core/utils/date';
import { getPublicFileLink } from '@/core/utils/files';

const SystemFilesPage = () => {
  const [systemFiles, setSystemFiles] = useState<Array<any>>([]);
  const [modalFileData, setModalFileData] = useState({ key: '', name: '' });
  const dispatch = useAppDispatch();

  const openFileModal = (fileKey: string, fileName: string) => {
    setModalFileData({ key: fileKey, name: fileName });
    setOpenUploadFileModal(true);
    return true;
  };

  const loadSystemFiles = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, any[]>('/system/files');

      setSystemFiles(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const [openUploadFileModal, setOpenUploadFileModal] = useState(false);

  useEffect(() => {
    loadSystemFiles();
  }, [loadSystemFiles]);

  const privacyPolicyFile = useMemo(() => {
    return systemFiles.find((file) => file.key === 'privacy_policy');
  }, [systemFiles]);
  const personalTermsFile = useMemo(() => {
    return systemFiles.find((file) => file.key === 'personal_terms');
  }, [systemFiles]);

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl'}>Изменение сущностей</div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div
              className={'sticky top-0 left-0 border grid grid-cols-[5%_20%_20%_20%_25%_10%] min-h-8 border bg-modal'}
            >
              <div className={'text-2xl border-r text-center'}>ID</div>
              <div className={'text-2xl border-r px-2'}>Тип файла</div>
              <div className={'text-2xl border-r px-2'}>Название файла</div>
              <div className={'text-2xl border-r px-2'}>Ссылка</div>
              <div className={'text-2xl border-r px-2'}>Время добавления</div>
              <div className={'text-2xl text-center'}>Действия</div>
            </div>
            <div className={'border w-full grid grid-cols-[5%_20%_20%_20%_25%_10%]'}>
              <div className={'text-3xl border-r px-2 py-2 text-center'}>{privacyPolicyFile?.id || '-'}</div>
              <div className={'text-3xl border-r px-2 py-2'}>Политика конфидециальности</div>
              <div className={'text-3xl border-r px-2 py-2'}>{privacyPolicyFile?.filename || 'Не заполнено'}</div>
              {privacyPolicyFile?.path ? (
                <a
                  className={'text-2xl border-r px-2 py-2 cursor:pointer hover:underline'}
                  target={'_blank'}
                  href={getPublicFileLink(privacyPolicyFile?.path || '')}
                  download
                  rel={'noreferrer'}
                >
                  Скачать
                </a>
              ) : (
                <div className={'text-2xl border-r px-2 py-2'}>Не заполнено</div>
              )}
              <div className={'text-2xl border-r px-2 py-2 text-center'}>
                {normalizeServerDate(privacyPolicyFile?.uploadedAt || '') || 'Не заполнено'}
              </div>
              <div className={'flex flex-col px-2 py-2'}>
                <UIButton
                  text={'Изменить'}
                  className={'mb-2'}
                  onClick={() => openFileModal('privacy_policy', 'Политика конфиденциальности')}
                />
                <UIButton text={'Удалить'} />
              </div>
            </div>
            <div className={'border w-full grid grid-cols-[5%_20%_20%_20%_25%_10%]'}>
              <div className={'text-3xl border-r px-2 py-2 text-center'}>{privacyPolicyFile?.id || '-'}</div>
              <div className={'text-3xl border-r px-2 py-2'}>Согласие на обработку персональных данных</div>
              <div className={'text-3xl border-r px-2 py-2'}>{personalTermsFile?.filename || 'Не заполнено'}</div>
              {personalTermsFile?.path ? (
                <a
                  className={'text-2xl border-r px-2 py-2 cursor:pointer hover:underline'}
                  target={'_blank'}
                  href={getPublicFileLink(personalTermsFile?.path || '')}
                  download
                  rel={'noreferrer'}
                >
                  Скачать
                </a>
              ) : (
                <div className={'text-2xl border-r px-2 py-2'}>Не заполнено</div>
              )}
              <div className={'text-2xl border-r px-2 py-2 text-center'}>
                {personalTermsFile?.uploadedAt ? normalizeServerDate(personalTermsFile?.uploadedAt) : 'Не заполнено'}
              </div>
              <div className={'flex flex-col px-2 py-2'}>
                <UIButton
                  text={'Изменить'}
                  className={'mb-2'}
                  onClick={() => openFileModal('personal_terms', 'Согласие на обработку персональных данных')}
                />
                <UIButton text={'Удалить'} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <UpdateFileModal
        open={openUploadFileModal}
        fileKey={modalFileData.key}
        fileTypeText={modalFileData.name}
        onClose={() => setOpenUploadFileModal(false)}
      />
    </div>
  );
};

export default routeChecker(SystemFilesPage, 'adminOnly');
