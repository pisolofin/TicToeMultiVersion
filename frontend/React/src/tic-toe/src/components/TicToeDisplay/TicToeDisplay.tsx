import React from 'react';
import { PlayerToPlay } from '../../shared/models/ticToe.model';

interface TicToeDisplayProps {
	/** Current player */
	playerToPlay	: PlayerToPlay;
	/** Player who won */
	playerWon		: PlayerToPlay | null;
	/** Callbacl for restart game event */
	onRestart?		: () => void;

	/** Name of PlayerX */
	playerXName		: string;
	/** Name of PlayerO */
	playerOName		: string;
}

const TicToeDisplay: React.FC<TicToeDisplayProps> = (props: TicToeDisplayProps) => {
	/** Return the name of the player */
	const playerToName = (player: PlayerToPlay): string => {
		switch (player) {
			case PlayerToPlay.PlayerX:
				return props.playerXName || "X";
			case PlayerToPlay.PlayerO:
				return props.playerOName || "O";
			default:
				return "";
		}
	};

	/** Handle restart request */
	const onRestartHandler = (): void => {
		props.onRestart?.();
	};

	console.info("TicToeDisplay render");

	return (<>
		{props.playerWon == null &&
			<h4>Turn of player {playerToName(props.playerToPlay)}</h4>
		}
		{props.playerWon != null &&
			<h4>Player {playerToName(props.playerWon)} won</h4>
		}
		<button onClick={onRestartHandler}>Restart</button>
	</>);
}

export default TicToeDisplay;
