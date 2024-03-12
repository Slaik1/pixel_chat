import {
  useRef,
  FC,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react';

import useCaret from './hooks/useCaret';

import styles from './Input.module.scss';

const Terminal: FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const writerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const userRef = useRef<HTMLParagraphElement>(null);
  const [inputText, setInputText] = useState('');

  const { calculateMove } = useCaret(
    cursorRef,
    writerRef,
    textAreaRef,
    userRef
  );

  useEffect(() => {
    const textArea = textAreaRef.current;

    if (!textArea) return;

    textArea.focus();

    const handleFocus = () => {
      textArea.focus();
    };

    textArea.addEventListener('blur', handleFocus);

    return () => {
      textArea.removeEventListener('blur', handleFocus);
    };
  }, []);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Space' && inputText.at(-1) === ' ') {
      e.preventDefault();

      return;
    }
    if (e.code === 'Enter') {
      e.preventDefault();
      console.log('отправил сообщение');

      return;
    }

    setTimeout(calculateMove, 10);
  };

  return (
    <div className={styles.terminal}>
      <textarea
        className={styles.textarea}
        value={inputText}
        onChange={changeHandler}
        onKeyDown={onKeyDownHandler}
        ref={textAreaRef}
        maxLength={450}
      ></textarea>
      <div className={styles.wrapper}>
        <p className={styles.user} ref={userRef}>
          C:\Users\Slaik&gt;
        </p>
        <div className={styles.writer} ref={writerRef}>
          <p>{inputText}</p>
          <span className={styles.cursor} ref={cursorRef}></span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
