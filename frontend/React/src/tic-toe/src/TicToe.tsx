import React, { useRef, useState } from 'react';
import TicToeBoard from './components/TicToeBoard/TicToeBoard';
import TicToeDisplay from './components/TicToeDisplay/TicToeDisplay';
import { PlayerToPlay } from './models/ticToe.model';

import './TicToe.scss';

interface TicToeProps {

}

const TicToe: React.FC<TicToeProps> = (props: TicToeProps) => {
	/** Game turn for player */
	const [playerToPlay, setPlayerToPlay] = useState<PlayerToPlay>(PlayerToPlay.PlayerX);
	/** Board state */
	const [playerWon, setPlayerWon] = useState<PlayerToPlay | null>(null);
	/** Active state of the game */
	const [isGameActive, setIsGameActive] = useState<boolean>(true);

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

	/** On active game state changed */
	const onIsGameActiveChanged = (isGameActive: boolean): void => {
		console.log("onIsGameActiveChanged" + isGameActive);
		setIsGameActive(isGameActive);
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
					onIsGameActiveChanged={onIsGameActiveChanged}
				/>
			</div>
			<div className="tic-toe-display-container">
				<TicToeDisplay
					playerToPlay={playerToPlay}
					playerWon={playerWon}
					isGameActive={isGameActive}
					onRestart={onRestartHandler}
				/>
			</div>
		</div>
	</>);
};

export default TicToe;
