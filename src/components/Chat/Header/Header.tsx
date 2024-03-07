import { FC } from 'react';

import styles from './Header.module.scss'

const Header: FC = () => {
	return (
		<div className={styles.headerWrapper}>
			Общий чат
		</div>
	)
}

export default Header