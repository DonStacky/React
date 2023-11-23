import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../src/styles/app.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}
