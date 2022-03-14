import React from 'react';
import { PlayerToPlay } from '../../models/ticToe.model';

interface TicToeDisplayProps {
	playerToPlay	: PlayerToPlay;
	playerWon		: PlayerToPlay | null;
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

	return (<>
		<h4>Turn of player {playerToName(props.playerToPlay)}</h4>
		{props.playerWon != null &&
			<h4>Player {playerToName(props.playerWon)} won</h4>
		}	
	</>);
}

export default TicToeDisplay;
