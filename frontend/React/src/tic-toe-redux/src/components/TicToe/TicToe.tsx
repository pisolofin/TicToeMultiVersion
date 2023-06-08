import React, { useContext, useEffect } from 'react';
import TicToeBoard from '../TicToeBoard/TicToeBoard';
import TicToeDisplay from '../TicToeDisplay/TicToeDisplay';
import TicToeDisplayStatus from '../TicToeDisplay/TicToeDisplayStatus';
import * as GameSelectors from '../../redux/game.selectors';

// Component style
import './TicToe.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlayerToPlay } from '../../shared/models/ticToe.model';
import { TicToeGameReduxService, TicToeGameReduxServiceContext } from '../../services/tic-toe-redux.service';

interface TicToeProps {

}

const TicToe: React.FC<TicToeProps> = (props: TicToeProps) => {
	/** Game turn for player */
	const playerToPlay	: PlayerToPlay = useSelector(GameSelectors.selectPlayerToPlay);
	/** Service for the game */
	const _ticToeGameService: TicToeGameReduxService = useContext(TicToeGameReduxServiceContext);

	useEffect(() => {
		console.log(playerToPlay);
		_ticToeGameService.calculateAsyncAction();
	}, [playerToPlay, _ticToeGameService]);

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
		<div className="other-container">
			<TicToeDisplayStatus />
		</div>
		<div className="other-container">
			<Link to="/configuration">Go to configuration</Link>
		</div>
	</>);
};

export default TicToe;
