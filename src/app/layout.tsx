import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import GlobalLoader from '@/features/loading/GlobalBusy';
import Providers from '@/app/providers';
import ErrorModal from '@/features/error-modal/ErrorModal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gradior',
  description: 'Gradior AI',
  creator: 'Denis G.',
};

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <html lang={'en'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full overflow-hidden bg-[url("../assets/images/main-bg.png")] bg-no-repeat bg-cover bg-left`}
      >
        <Providers>
          {children}
          <GlobalLoader />
          <ErrorModal />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
