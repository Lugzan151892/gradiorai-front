import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import GlobalLoader from '@/features/loading/GlobalBusy';
import Providers from '@/app/providers';
import ErrorModal from '@/features/error-modal/ErrorModal';
import UserInitializer from '@/components/user-initializer/UserInitializer';
import { getMetaData } from '@/core/utils/meta';

const interDisplay = localFont({
  src: [
    {
      path: '../assets/fonts/InterDisplay-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterDisplay-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/InterDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterDisplay-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/InterDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterDisplay-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../assets/fonts/InterDisplay-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterDisplay-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../assets/fonts/InterDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterDisplay-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-inter-display',
});

export const metadata: Metadata = getMetaData();

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <html lang={'en'}>
      <body
        className={`${interDisplay.className} antialiased bg-[#030b1b] w-full h-full overflow-hidden leading-[100%] font-normal text-sm tracking-[0]`}
      >
        <Providers>
          {children}
          <GlobalLoader />
          <ErrorModal />
          <UserInitializer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
