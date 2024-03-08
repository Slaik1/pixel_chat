import { RefObject, useEffect, useState, useCallback } from 'react';

import { debounce } from '../../../../helpers/debounce';

const useCaret = (
  cursorRef: RefObject<HTMLSpanElement>,
  writerRef: RefObject<HTMLSpanElement>,
  inputText: string,
  textAreaRef: RefObject<HTMLTextAreaElement>
) => {
  const [letterLength, setLetterLength] = useState(0);

  useEffect(() => {
    if (!writerRef.current) return;

    const currentFontSize = parseInt(
      window.getComputedStyle(writerRef.current).fontSize
    );
    const calculatedLength = currentFontSize * 0.6039;

    setLetterLength(calculatedLength);
  }, [letterLength]);

  const move = () => {
    const cursor = cursorRef.current;

    console.log('move');
    
    const caretPos = textAreaRef.current?.selectionStart;

    if (!cursor || caretPos === undefined) return;

    cursor.style.left = `${caretPos * letterLength}px`;
  };

  return { move };
};

export default useCaret;
