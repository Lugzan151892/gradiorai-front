'use client';

import { useUser } from '@/hooks/useUser';

const UserInitializer = () => {
  useUser();
  return null;
};

export default UserInitializer;
