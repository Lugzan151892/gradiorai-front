import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import GlobalLoader from '@/features/loading/GlobalBusy';
import Providers from '@/app/providers';
import ErrorModal from '@/features/error-modal/ErrorModal';
import UserInitializer from '@/components/user-initializer/UserInitializer';
import { getMetaData } from '@/core/utils/meta';
import Script from 'next/script';

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

const isProduction = process.env.IS_PRODUCTION === 'true';
export const metadata: Metadata = getMetaData();

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <html lang={'en'}>
      <body
        className={`${interDisplay.className} antialiased bg-[#030b1b] w-full h-full overflow-hidden leading-[100%] font-normal text-sm tracking-[0]`}
      >
        {isProduction && (
          <>
            <Script
              src={'https://www.googletagmanager.com/gtag/js?id=G-SE1HQ8CLZ3'}
              strategy={'afterInteractive'}
            />
            <Script
              id={'google-analytics'}
              strategy={'afterInteractive'}
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-SE1HQ8CLZ3');
              `}
            </Script>
            {/* Yandex.Metrika */}
            <Script
              id={'yandex-metrika'}
              strategy={'afterInteractive'}
            >
              {`
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                  k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=103498836', 'ym');

                ym(103498836, 'init', {
                  ssr: true,
                  webvisor: true,
                  clickmap: true,
                  ecommerce: "dataLayer",
                  accurateTrackBounce: true,
                  trackLinks: true
                });
              `}
            </Script>
            {/* <noscript> fallback */}
            <noscript>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={'https://mc.yandex.ru/watch/103498836'}
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt={''}
                />
              </div>
            </noscript>
          </>
        )}
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
