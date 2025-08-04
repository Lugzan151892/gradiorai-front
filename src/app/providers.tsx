'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ConfirmProvider } from '@/features/confirm-provider/ConfirmProvider';

const Providers: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <ConfirmProvider>
      <Provider store={store}>{children}</Provider>;
    </ConfirmProvider>
  );
};

export default Providers;
