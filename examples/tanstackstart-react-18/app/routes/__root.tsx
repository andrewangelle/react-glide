import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import glideStyles from 'react-glide/lib/reactGlide.css?url';
import { DevTools } from '~/components/DevTools';

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
        title: 'Andrew Angelle',
      },
      {
        rel: 'icon',
        link: '/favicon.ico',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: glideStyles,
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
