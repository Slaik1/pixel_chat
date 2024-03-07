import { useRef, FC, useEffect, useState, ChangeEvent } from 'react';

import useCaret from './hooks/useCaret';

import styles from './Input.module.scss';

const Terminal:FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const writerRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLBRElement>(null);
  const [inputText, setInputText] = useState('');

  const { move } = useCaret(cursorRef, writerRef, inputText);

  useEffect(() => {
    textAreaRef.current?.focus()

    const handleFocus = () => {
      textAreaRef.current?.focus()
    };

    if (textAreaRef.current) {
      textAreaRef.current.addEventListener('blur', handleFocus);
    }

    return () => {
      if (textAreaRef.current) {
        textAreaRef.current.removeEventListener('blur', handleFocus);
      }
    };
  }, [textAreaRef]);

  const changeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    move()
  }

  return (
    <div className={styles.terminal}>
      <textarea
        className={styles.textarea}
        value={inputText}
        onChange={changeHandler}
        ref={textAreaRef}
      ></textarea>
      <div className={styles.getter}>
        <span className={styles.writer} ref={writerRef}>{inputText}</span>
        <b className={styles.cursor} ref={cursorRef}>B</b>
      </div>
    </div>
  );
}

export default Terminal;
