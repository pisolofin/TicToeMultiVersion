import React from 'react';
import TicToeBoard from './components/TicToeBoard/TicToeBoard';
import TicToeDisplay from './components/TicToeDisplay/TicToeDisplay';
import TicToeDisplayStatus from './components/TicToeDisplay/TicToeDisplayStatus';
import { Provider } from 'react-redux';
import { gameStore } from './redux/game.store';

// Component style
import './TicToe.scss';

interface TicToeProps {

}

const TicToe: React.FC<TicToeProps> = (props: TicToeProps) => {
	/** Handle restart request */
	const onRestartHandler = (): void => {

	}

	return (<>
		<Provider store={gameStore}>
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
			<div>
				<TicToeDisplayStatus />
			</div>
		</Provider>
	</>);
};

export default TicToe;
