// components/AvatarUploadModal.tsx
'use client';
import CustomModal from '@/components/ui/modal/CustomModal';
import Api from '@/core/api/api';
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';

interface AvatarUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAvatarSaved: (url: string) => void;
}

export const AvatarUploadModal: React.FC<AvatarUploadModalProps> = ({ open, onOpenChange, onAvatarSaved }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const getCroppedImage = async (): Promise<Blob | null> => {
    if (!imageSrc || !croppedAreaPixels) return null;

    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
    });
  };

  const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const blob = await getCroppedImage();
    if (!blob) return;

    const avatar = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
    const result = await Api.postFormData<{ file: File }, any>('/user/files/avatar', { file: avatar });

    console.log(result);

    const formData = new FormData();
    formData.append('file', blob, 'avatar.jpg');

    const res = await fetch('/api/avatar', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    onAvatarSaved(data.url);
    setIsSaving(false);
    onOpenChange(false);
  };

  return (
    <CustomModal
      caption={'Загрузить аватар'}
      open={open}
    >
      {!imageSrc && (
        <div className={'flex flex-col items-center'}>
          <input
            type={'file'}
            accept={'image/*'}
            onChange={handleFileChange}
          />
        </div>
      )}

      {imageSrc && (
        <div className={'relative w-full h-[300px] bg-gray-100'}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape={'round'}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <input
            type={'range'}
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className={'mt-4 w-full'}
          />
        </div>
      )}

      <div className={'flex justify-end gap-2 mt-4'}>
        <button
          onClick={() => onOpenChange(false)}
          className={'text-gray-600 px-4 py-2'}
        >
          Отмена
        </button>
        <button
          onClick={handleSave}
          className={'bg-blue-600 text-white px-4 py-2 rounded'}
          disabled={isSaving}
        >
          {isSaving ? 'Сохраняю...' : 'Сохранить'}
        </button>
      </div>
    </CustomModal>
  );
};
