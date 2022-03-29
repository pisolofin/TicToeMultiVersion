import React, { useState } from 'react';
import TicToeBoard from './components/TicToeBoard/TicToeBoard';
import TicToeDisplay from './components/TicToeDisplay/TicToeDisplay';
import { PlayerToPlay } from './shared/models/ticToe.model';

import './TicToe.scss';

interface TicToeProps {

}

const TicToe: React.FC<TicToeProps> = (props: TicToeProps) => {
	/** Game turn for player */
	const [playerToPlay, setPlayerToPlay] = useState<PlayerToPlay>(PlayerToPlay.PlayerX);
	/** Board state */
	const [playerWon, setPlayerWon] = useState<PlayerToPlay | null>(null);

	/** Callback when somebody won */
	const onWonHandler = (player: PlayerToPlay): void => {
		console.log("onWonHandler" + player);
		setPlayerWon(player);
	};

	/** On player changed */
	const onPlayerChanged = (player: PlayerToPlay): void => {
		console.log("onPlayerChanged" + player);
		setPlayerToPlay(player);
	};

	/** Handle restart request */
	const onRestartHandler = (): void => {
		console.log("Reset");
	}

	return (<>
		<div className="tic-toe-container">
			<div className="tic-toe-board-container">
				<TicToeBoard
					onWon={onWonHandler}
					onPlayerChanged={onPlayerChanged}
				/>
			</div>
			<div className="tic-toe-display-container">
				<TicToeDisplay
					playerToPlay={playerToPlay}
					playerWon={playerWon}
					onRestart={onRestartHandler}
				/>
			</div>
		</div>
	</>);
};

export default TicToe;
