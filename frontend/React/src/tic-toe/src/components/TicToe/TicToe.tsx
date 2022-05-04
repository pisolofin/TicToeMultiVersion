import React, { MutableRefObject, useState, useRef } from 'react';
import TicToeBoard, { TicToeBoardRef } from '../TicToeBoard/TicToeBoard';
import TicToeDisplay from '../TicToeDisplay/TicToeDisplay';
import TicToeDisplayStatus from '../TicToeDisplay/TicToeDisplayStatus';
import { PlayerToPlay } from '../../shared/models/ticToe.model';

import './TicToe.scss';
import { Link } from 'react-router-dom';

interface TicToeProps {
	/** Name of PlayerX */
	playerXName: string;
	/** Name of PlayerO */
	playerOName: string;
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
					playerXName={props.playerXName}
					playerOName={props.playerOName}
				/>
			</div>
		</div>
		<div className="other-container">
			<TicToeDisplayStatus
				isGameActive={isGameActive}
			/>
		</div>
		<div className="other-container">
			<Link to="/configuration">Go to configuration</Link>
		</div>
	</>);
};

export default TicToe;
