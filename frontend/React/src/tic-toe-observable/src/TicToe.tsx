import React from 'react';
import TicToeBoard from './components/TicToeBoard/TicToeBoard';
import TicToeDisplay from './components/TicToeDisplay/TicToeDisplay';

// Component style
import './TicToe.scss';

interface TicToeProps {

}

const TicToe: React.FC<TicToeProps> = (props: TicToeProps) => {
	/** Handle restart request */
	const onRestartHandler = (): void => {

	}

	return (<>
		<div className="tic-toe-container">
			<div className="tic-toe-board-container">
				<TicToeBoard />
			</div>
			<div className="tic-toe-display-container">
				<TicToeDisplay
					onRestart={onRestartHandler}
				/>
			</div>
		</div>
	</>);
};

export default TicToe;
