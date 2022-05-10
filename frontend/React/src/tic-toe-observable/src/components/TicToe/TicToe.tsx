import React from 'react';
import { Link } from 'react-router-dom';
import TicToeBoard from '../TicToeBoard/TicToeBoard';
import TicToeDisplay from '../TicToeDisplay/TicToeDisplay';
import TicToeDisplayStatus from '../TicToeDisplay/TicToeDisplayStatus';

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
		<div className="other-container">
			<TicToeDisplayStatus />
		</div>
		<div className="other-container">
			<Link to="/configuration">Go to configuration</Link>
		</div>
	</>);
};

export default TicToe;
