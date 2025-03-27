import { Suspense, lazy } from 'react';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        import('@tanstack/react-router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export function DevTools() {
  return (
    <Suspense fallback={null}>
      <TanStackRouterDevtools />
    </Suspense>
  );
}
