import { FC } from 'react';

import styles from './Message.module.scss'

interface MessageProps {
	message: string;
}

const Message: FC<MessageProps> = ({message}) => {
	return (
		<p className={styles.message}>{message}</p>
	)
}

export default Message