'use client';

import React from 'react';
import AppLayout from '@/components/app-layout/AppLayout';

const AppLayoutClient = ({ children, ...props }: React.ComponentProps<typeof AppLayout>) => {
  return <AppLayout {...props}>{children}</AppLayout>;
};

export default AppLayoutClient;
