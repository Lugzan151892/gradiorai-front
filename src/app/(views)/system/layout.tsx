import AppLayoutClient from '@/components/app-layout/AppLayoutClient';
import React from 'react';

const SystemLayout: React.FC<{
  children: Readonly<React.ReactNode>;
}> = ({ children }) => {
  return <AppLayoutClient withState>{children}</AppLayoutClient>;
};

export default SystemLayout;
