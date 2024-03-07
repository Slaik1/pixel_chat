import { useEffect, useRef, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

import { API_WS_ADDRESS } from '../constants';

const useChat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const ws = useRef<ReconnectingWebSocket | null>(null);

  useEffect(() => {
    const socket = new ReconnectingWebSocket(API_WS_ADDRESS);

    ws.current = socket;

    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (typeof message == 'string') {
        console.log(message);

        setMessages((prevArr) => [...prevArr, message]);
      } else {
        console.log('пришёл массив' + message);
				setMessages((prevArr) => [...prevArr, ...message]);
      }
    };

    socket.onmessage = handleMessage;

    return () => {
      socket.close();
    };
  }, []);

  return { ws, messages, setMessages };
};

export default useChat;
