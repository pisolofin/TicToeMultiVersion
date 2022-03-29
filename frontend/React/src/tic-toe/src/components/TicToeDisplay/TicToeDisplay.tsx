import React from 'react';
import { PlayerToPlay } from '../../shared/models/ticToe.model';

interface TicToeDisplayProps {
	playerToPlay	: PlayerToPlay;
	playerWon		: PlayerToPlay | null;
	onRestart?		: () => void;
}

const TicToeDisplay: React.FC<TicToeDisplayProps> = (props: TicToeDisplayProps) => {
	/** Return the name of the player */
	const playerToName = (player: PlayerToPlay): string => {
		switch (player) {
			case PlayerToPlay.PlayerX:
				return "X";
			case PlayerToPlay.PlayerO:
				return "O";
			default:
				return "";
		}
	};

	/** Handle restart request */
	const onRestartHandler = (): void => {
		props.onRestart?.();
	};

	return (<>
		{props.playerWon == null &&
			<h4>Turn of player {playerToName(props.playerToPlay)}</h4>
		}
		{props.playerWon != null &&
			<h4>Player {playerToName(props.playerWon)} won</h4>
		}
		{/* <button onClick={onRestartHandler}>Restart</button> */}
	</>);
}

export default TicToeDisplay;
