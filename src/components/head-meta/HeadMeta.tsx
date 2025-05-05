import Head from 'next/head';
import React from 'react';

interface IHeadMetaProps {
  title: string;
  description: string;
  url?: string;
}

const HeadMeta: React.FC<Readonly<IHeadMetaProps>> = ({ title, description, url }) => (
  <Head>
    <title>{title}</title>
    <meta
      name={'yandex-verification'}
      content={'93977f41416139bf'}
    />
    <meta
      name={'description'}
      content={description}
    />
    <meta
      property={'og:title'}
      content={title}
    />
    <meta
      property={'og:description'}
      content={description}
    />
    <meta
      property={'og:url'}
      content={url || 'https://gradiorai.ru/'}
    />
    <meta
      name={'twitter:card'}
      content={'summary_large_image'}
    />
  </Head>
);

export default HeadMeta;
