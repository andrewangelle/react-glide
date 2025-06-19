import { Suspense, lazy } from 'react';

function createDevTools() {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  return lazy(() =>
    import('@tanstack/react-router-devtools').then((res) => ({
      default: res.TanStackRouterDevtools,
    })),
  );
}

const TanStackRouterDevtools = createDevTools();

export function DevTools() {
  return (
    <Suspense fallback={null}>
      <TanStackRouterDevtools />
    </Suspense>
  );
}
