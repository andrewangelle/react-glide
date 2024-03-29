import { Children, ReactElement, useEffect, useState } from 'react';

export function usePreload(
  children: ReactElement[]
): {done: boolean; loading: boolean;}{
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);

  function preloadImages(): void{
    const urls = getImageUrls();

    if (urls.length > 0) {
      urls.forEach(src => {
        const newImage = new Image();
        newImage.src = src;
        newImage.onload = updateLoadCount;
      });
    }

    if (urls.length === 0) {
      setDone(true)
      setLoading(false)
    }
  };

  function getImageUrls(): string[] {
    let urlResults: string[] = [];

    Children.map(children, (child: ReactElement, index) => {
      const res = traverseElementTree(child);
      urlResults = [...urlResults, ...res];
    });

    setUrls([...urlResults])
    return urlResults;
  };

  function traverseElementTree(element: ReactElement): string[] {
    const results: string[] = [];
    if (element.type === 'img') {
      results.push(element.props.src);
    }
    if (element.props?.children) {
      return traverseElementTree(element.props.children);
    }
    return results;
  };

  function updateLoadCount(): void {
    setLoadCount(prevState => prevState + 1)
  }

  useEffect(() => {
    preloadImages()
  }, []);

  useEffect(() => {
    if(loadCount === urls.length){
      setDone(true)
      setLoading(false)
    }
  }, [urls, loadCount, setDone, setLoadCount])

  return {
    done,
    loading
  }
}
