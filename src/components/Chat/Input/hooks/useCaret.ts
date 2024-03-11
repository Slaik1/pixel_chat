import { RefObject, useEffect, useState } from 'react';

interface CaretPos {
  top: number;
  left: number;
}

const useCaret = (
  cursorRef: RefObject<HTMLSpanElement>,
  writerRef: RefObject<HTMLDivElement>,
  textAreaRef: RefObject<HTMLTextAreaElement>,
  userRef: RefObject<HTMLParagraphElement>
) => {
  const [letterLength, setLetterLength] = useState(0);
  const [letterHeight, setLetterHeight] = useState(0);
  const [userLength, setUserLength] = useState(0);

  useEffect(() => {
    if (!writerRef.current || !userRef.current) return;

    const currentFontSize = parseInt(
      window.getComputedStyle(writerRef.current).fontSize
    );
    const calculatedLetterLength = currentFontSize * 0.601;
    const calculatedLetterHeight = currentFontSize * 1
    const calculatedUserLength = userRef.current.innerText.length;

    console.log(calculatedUserLength);

    setLetterLength(calculatedLetterLength);
    setLetterHeight(calculatedLetterHeight)
    setUserLength(calculatedUserLength);
  }, []);

  const move = (cursor: HTMLSpanElement, pos: CaretPos) => {
    cursor.style.left = `${pos.left * letterLength}px`;
    cursor.style.top = `${(pos.top * letterHeight) + letterHeight}px`;
  };

  const calculateMove = () => {
    const cursor = cursorRef.current;

    console.log('calculateMove');

    const caretPos = textAreaRef.current?.selectionStart;

    if (!cursor || caretPos === undefined) return;

    const maxLettersPerLine = Math.floor((window.innerWidth - userLength * letterLength) / letterLength);

    let cursorLeftPos = caretPos % maxLettersPerLine;

    const cursorTopPos = Math.floor(caretPos / maxLettersPerLine);

    // console.log(cursorTopPos);

    // console.log(caretPos, maxLettersPerLine, cursorLeftPos);

    if (cursorTopPos === 0) cursorLeftPos += userLength;

    const newPos: CaretPos = {
      top: cursorTopPos,
      left: cursorLeftPos,
    };

    move(cursor, newPos);
  };

  return { calculateMove };
};

export default useCaret;
