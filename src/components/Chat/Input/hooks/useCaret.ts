import { RefObject, useEffect } from 'react';

const useCaret = (
  cursorRef: RefObject<HTMLSpanElement>,
  writerRef: RefObject<HTMLSpanElement>,
  inputText: string
) => {
  useEffect(() => {
    document.addEventListener('keydown', function (e: KeyboardEvent) {
      if (e.code === 'ArrowRight') {
        move(10);
      }

      if (e.code === 'ArrowLeft') {
        move(-10);
      }
    });
  }, []);

  const move = (step?: number) => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const currentLeft = parseFloat(cursor.style.left) || 0;

    if (step) {
      cursor.style.left = `${currentLeft + step}px`;

      return;
    }

    cursor.style.left = `${inputText.length * 10}px`;
  };

  return { move };
};

export default useCaret;
