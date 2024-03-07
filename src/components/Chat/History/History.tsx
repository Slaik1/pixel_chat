import { FC } from 'react';

import styles from './History.module.scss'
import Message from './Message/Message';

interface HistoryProps {
	messages: string[]
}

const History: FC<HistoryProps> = ({messages}) => {
	return (
    <div>
      <div>
        {messages.map((el, i) => 
          <Message message={el} key={i}/>
        )}
      </div>
    </div>
	)
}

export default History