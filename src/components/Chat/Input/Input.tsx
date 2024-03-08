import { useRef, FC, useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';

import useCaret from './hooks/useCaret';

import styles from './Input.module.scss';

const Terminal: FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const writerRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLBRElement>(null);
  const [inputText, setInputText] = useState('');

  const { move } = useCaret(cursorRef, writerRef, inputText, textAreaRef);

  useEffect(() => {
    textAreaRef.current?.focus();

    const handleFocus = () => {
      textAreaRef.current?.focus();
    };

    if (textAreaRef.current) {
      textAreaRef.current.addEventListener('blur', handleFocus);
    }

    return () => {
      if (textAreaRef.current) {
        textAreaRef.current.removeEventListener('blur', handleFocus);
      }
    };
  }, []);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.code === 'Space' && inputText.at(-1) === ' ') {
      e.preventDefault()
      
      return
    }
    move()
  }

  return (
    <div className={styles.terminal}>
      <textarea
        className={styles.textarea}
        value={inputText}
        onChange={changeHandler}
        onKeyDown={onKeyDownHandler}
        ref={textAreaRef}
      ></textarea>
      <div className={styles.wrapper}>
        <h1 className={styles.user}>C:\Users\Slaik&gt;</h1>
        <span className={styles.writer} ref={writerRef}>
        <>{inputText}</>
          <b className={styles.cursor} ref={cursorRef}></b>
        </span>
      </div>
    </div>
  );
};

export default Terminal;
