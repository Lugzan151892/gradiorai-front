import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import userAvatarEmpty from '@/assets/icons/user-avatar-empty.svg';
import { API_PATH } from '@/core/api/api';
import { RootState } from '@/store';
import { useAppSelector } from '@/hooks/redux';
import { IUser } from '@/core/interfaces/types';

const UserAvatar: React.FC<
  Readonly<{
    userData?: IUser;
    size?: number;
    alt?: string;
  }>
> = ({ size = 40, alt = 'profile', userData }) => {
  const [imgError, setImgError] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.user);

  const avatarVersion = useMemo(() => {
    const currentUser = userData || user;
    const savedAvatar = currentUser?.files?.find((file) => file.type === 'AVATAR');
    const version = savedAvatar?.updatedAt ? new Date(savedAvatar.updatedAt).getTime() : '';
    return version;
  }, [user, userData]);

  const imgSrc =
    imgError || (!userData?.id && !user?.id)
      ? userAvatarEmpty
      : `${API_PATH}/user/files/view/${userData ? userData?.id : user?.id}/avatar?v=${avatarVersion}`;

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      className={'rounded-full'}
      onError={() => setImgError(true)}
      loading={'lazy'}
    />
  );
};

export default UserAvatar;
