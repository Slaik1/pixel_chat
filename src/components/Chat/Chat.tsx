import { FC } from 'react';

import useChat from '../../hooks/useChat';

import Header from './Header/Header';
import History from './History/History';
import Input from './Input/Input';

import styles from './Chat.module.scss'

const Chat: FC = () => {
	const {ws, messages, setMessages} = useChat()

	return (
		<div className={styles.chatWrapper}>
			<Header/>
			<History messages={messages}/>
			<Input/>
		</div>
	)
}

export default Chat