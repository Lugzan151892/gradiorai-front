'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ConfirmProvider } from '@/features/confirm-provider/ConfirmProvider';
import { I18nProvider } from '@/i18n/I18nProvider';
import { EditorProvider } from '@/i18n/EditorProvider';

const Providers: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <I18nProvider>
      <EditorProvider>
        <ConfirmProvider>
          <Provider store={store}>{children}</Provider>;
        </ConfirmProvider>
      </EditorProvider>
    </I18nProvider>
  );
};

export default Providers;
