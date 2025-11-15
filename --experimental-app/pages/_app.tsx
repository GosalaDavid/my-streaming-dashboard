"use client";
import React from 'react';
import Providers from '../app/Providers';
import '../app/globals.css';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
