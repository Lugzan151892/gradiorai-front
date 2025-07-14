import UIButton from '@/components/ui/button/UIButton';
import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import CustomModal from '@/components/ui/modal/CustomModal';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import { openModal } from '@/store/tech/techSlice';
import React, { useState } from 'react';

interface IUpdateFileModalProps {
  fileKey?: string;
  fileTypeText?: string;
  onFileSave?: () => void;
  open?: boolean;
  onClose?: () => void;
}

const UpdateFileModal: React.FC<Readonly<IUpdateFileModalProps>> = ({
  fileKey,
  open,
  onClose,
  fileTypeText,
  onFileSave,
}) => {
  const dispatch = useAppDispatch();
  const [uploadedFile, setUploadedFile] = useState<null | File>(null);

  const saveFile = async () => {
    if (!uploadedFile || !fileKey) {
      return;
    }

    try {
      await Api.postFormData(`/system/files/${fileKey}`, { file: uploadedFile });
      setUploadedFile(null);
      if (onClose) onClose();
      if (onFileSave) onFileSave();
      dispatch(openModal({ type: 'success', text: `Файл ${fileTypeText} успешно сохранен!` }));
    } catch (e: any) {
      errorHandler(e, dispatch);
    }
  };

  return (
    <CustomModal
      open={open}
      caption={'Загрузить новый файл'}
      onClose={onClose}
    >
      <div className={'p-6'}>
        <FileDropzone
          className={'mt-6'}
          label={fileTypeText}
          file={uploadedFile}
          maxFileSize={2}
          formats={['docx', 'pdf', 'txt']}
          onFileSelected={setUploadedFile}
        />
        <div className={'flex'}>
          <UIButton
            className={'ml-auto'}
            text={'Сохранить'}
            disabled={!uploadedFile}
            onClick={saveFile}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default UpdateFileModal;
