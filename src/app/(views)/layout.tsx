'use client';

import { useUser } from '@/hooks/useUser';
import React from 'react';

const ProtectedLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  useUser();
  return <>{children}</>;
};

export default ProtectedLayout;
