import { RefObject, useEffect, useState } from 'react';

export function useInView<T extends HTMLElement>(
  ref: RefObject<T>,
  threshold = 0.35,
  rootMargin = '0px',
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return isInView;
}
