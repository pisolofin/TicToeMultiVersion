import React from 'react';
import TicToeBoard from './components/TicToeBoard/TicToeBoard';
import TicToeDisplay from './components/TicToeDisplay/TicToeDisplay';
import TicToeDisplayStatus from './components/TicToeDisplay/TicToeDisplayStatus';

// Component style
import './TicToe.scss';

const TicToe: React.FC = () => {
	return (<>
		<div className="tic-toe-container">
			<div className="tic-toe-board-container">
				<TicToeBoard />
			</div>
			<div className="tic-toe-display-container">
				<TicToeDisplay />
			</div>
		</div>
		<div>
			<TicToeDisplayStatus />
		</div>
	</>);
};

export default TicToe;
