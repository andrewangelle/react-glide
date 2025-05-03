import { useCallback, useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useCountdownTimer } from '~/utils/useCountdownTimer';

type ReactChildren<Props> = ReactElement<{
  src: string;
  children: ReactChildren<Props>;
}>;
type ElementTree = ReactChildren<{ src: string; children: ReactNode }>;

export function usePreloadImages(
  // biome-ignore lint/suspicious/noExplicitAny: reacts typings for children suck
  children: any = [],
  skip = false,
): {
  done: boolean;
  isPreloading: boolean;
} {
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);
  const [baseTimerDone, setBaseTimerDone] = useState(false);

  useCountdownTimer({
    skip: baseTimerDone,
    interval: 0.01,
    resetOnExpire: false,
    onExpire() {
      setBaseTimerDone(true);
    },
  });

  const preloadImages = useCallback(function preloadImages(): void {
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
  }, []);

  function getImageUrls(): string[] {
    let urlResults: string[] = [];

    for (const childElement of children) {
      const child = childElement;
      const res = traverseElementTree(child);
      urlResults = [...urlResults, ...res];
    }

    setUrls([...urlResults]);
    return urlResults;
  }

  function traverseElementTree(element: ElementTree): string[] {
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

  useEffect(() => {
    if (skip) {
      setBaseTimerDone(true);
    } else {
      preloadImages();
    }
  }, [preloadImages, skip]);

  useEffect(() => {
    if (loadCount === urls.length) {
      setDone(true);
      setLoading(false);
      setBaseTimerDone(true);
    }
  }, [urls, loadCount]);

  return {
    done: done && baseTimerDone,
    isPreloading: loading || !baseTimerDone,
  };
}
