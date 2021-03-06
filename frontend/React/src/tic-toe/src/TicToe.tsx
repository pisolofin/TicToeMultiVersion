import React, { MutableRefObject, useState } from 'react';
import { useRef } from 'react';
import TicToeBoard, { TicToeBoardRef } from './components/TicToeBoard/TicToeBoard';
import TicToeDisplay from './components/TicToeDisplay/TicToeDisplay';
import TicToeDisplayStatus from './components/TicToeDisplay/TicToeDisplayStatus';
import { PlayerToPlay } from './shared/models/ticToe.model';

import './TicToe.scss';

interface TicToeProps {

}

const TicToe: React.FC<TicToeProps> = (props: TicToeProps) => {
	/** Game turn for player */
	const [playerToPlay, setPlayerToPlay] = useState<PlayerToPlay>(PlayerToPlay.PlayerX);
	/** Player won the game */
	const [playerWon, setPlayerWon] = useState<PlayerToPlay | null>(null);
	/** Activation of the game, used for game ended or waiting */
	const [isGameActive, setIsGameActive] = useState<boolean>(true);
	/** Reference to board component */
	const boardRef: MutableRefObject<TicToeBoardRef | null> = useRef<TicToeBoardRef>(null);

	/** Callback when somebody won */
	const onWonHandler = (player: PlayerToPlay | null): void => {
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
		boardRef.current?.resetGame();
	};

	/** On activation of the game changed */
	const onIsGameActiveChanged = (isGameActive: boolean): void => {
		setIsGameActive(isGameActive);
	};

	return (<>
		<div className="tic-toe-container">
			<div className="tic-toe-board-container">
				<TicToeBoard
					ref={boardRef}
					onWon={onWonHandler}
					onPlayerChanged={onPlayerChanged}
					onIsGameActiveChanged={onIsGameActiveChanged}
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
		<div>
			<TicToeDisplayStatus
				isGameActive={isGameActive}
			/>
		</div>
	</>);
};

export default TicToe;
