import Image from 'next/image';
import React, { useState } from 'react';
import userAvatarEmpty from '@/assets/icons/user-avatar-empty.svg';
import { API_PATH } from '@/core/api/api';

const UserAvatar: React.FC<
  Readonly<{
    size?: number;
    alt?: string;
  }>
> = ({ size = 40, alt = 'profile' }) => {
  const [imgError, setImgError] = useState(false);
  const imgSrc = imgError ? userAvatarEmpty : `${API_PATH}/user/files/download/avatar`;

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
