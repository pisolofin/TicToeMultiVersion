import React, { useRef, useState } from 'react';
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
	/** Active state of the game */
	const [isGameActive, setIsGameActive] = useState<boolean>(true);

	/** Callback when somebody won */
	const onWonHandler = (player: PlayerToPlay): void => {
		setPlayerWon(player);
	};

	/** On player changed */
	const onPlayerChanged = (player: PlayerToPlay): void => {
		setPlayerToPlay(player);
	};

	/** On active game state changed */
	const onIsGameActiveChanged = (isGameActive: boolean): void => {
		setIsGameActive(isGameActive);
	};

	/** Handle restart request */
	const onRestartHandler = (): void => {

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
