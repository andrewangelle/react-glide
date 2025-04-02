import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { DevTools } from '~/components/DevTools';
import appStyles from '~/styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'React Glide Example',
      },
      {
        rel: 'icon',
        link: '/favicon.ico',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appStyles,
      },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <DevTools />
      </body>
    </html>
  );
}
