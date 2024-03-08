import { RefObject } from 'react';

export const getFontSize = (elementRef: RefObject<HTMLElement>): number => {
  const element = elementRef.current;

  if (!element) return 0;

  const originalText = element.textContent;
  const tempText = 'M';

  element.textContent = tempText;

  const fontSize = element.offsetHeight;

  element.textContent = originalText;

  return fontSize;
};
