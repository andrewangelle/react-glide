import Head from 'next/head';
import React, { type PropsWithChildren } from 'react';

type LayoutProps = {
  title?: string;
};
const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
};

export function Layout({ children, title }: PropsWithChildren<LayoutProps>) {
  return (
    <div style={layoutStyle}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  );
}
