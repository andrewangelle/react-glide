import { Children, type ReactElement, useEffect, useState } from 'react';

export function usePreload(children: ReactElement[]): {
  done: boolean;
  loading: boolean;
} {
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);

  function preloadImages(): void {
    const urls = getImageUrls();

    if (urls.length > 0) {
      for (const src of urls) {
        const newImage = new Image();
        newImage.src = src;
        newImage.onload = updateLoadCount;
      }
    }

    if (urls.length === 0) {
      setDone(true);
      setLoading(false);
    }
  }

  function getImageUrls(): string[] {
    let urlResults: string[] = [];

    Children.map(
      children,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (child: ReactElement<{ src: string; children: any }>, index) => {
        const res = traverseElementTree(child);
        urlResults = [...urlResults, ...res];
      },
    );

    setUrls([...urlResults]);
    return urlResults;
  }

  function traverseElementTree(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    element: ReactElement<{ src: string; children: any }>,
  ): string[] {
    const results: string[] = [];
    if (element.type === 'img') {
      results.push(element.props.src);
    }
    if (element.props?.children) {
      return traverseElementTree(element.props.children);
    }
    return results;
  }

  function updateLoadCount(): void {
    setLoadCount((prevState) => prevState + 1);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    if (loadCount === urls.length) {
      setDone(true);
      setLoading(false);
    }
  }, [urls, loadCount]);

  return {
    done,
    loading,
  };
}
