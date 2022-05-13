import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GameActions from '../../redux/game.actions';
import * as GameSelectors from '../../redux/game.selectors';
import { PlayerToPlay } from '../../shared/models/ticToe.model';

interface TicToeDisplayProps {
	onRestart?		: () => void;
}

const TicToeDisplay: React.FC<TicToeDisplayProps> = (props: TicToeDisplayProps) => {
	/** Game turn for player */
	const playerToPlay	: PlayerToPlay = useSelector(GameSelectors.selectPlayerToPlay);
	/** Player won the game */
	const playerWon		: PlayerToPlay | null = useSelector(GameSelectors.selectPlayerWon);
	/** Active state of the game */
	const isGameActive	: boolean = useSelector(GameSelectors.selectIsGameActive);
	/** Name of Player X */
	const playerXName	: string | null = useSelector(GameSelectors.selectPlayerXName);
	/** Name of Player O */
	const playerOName	: string | null = useSelector(GameSelectors.selectPlayerOName);

	const reduxDispatch = useDispatch();

	/** Return the name of the player */
	const playerToName = (player: PlayerToPlay): string => {
		switch (player) {
			case PlayerToPlay.PlayerX:
				return playerXName || "X";
			case PlayerToPlay.PlayerO:
				return playerOName || "O";
			default:
				return "";
		}
	};

	/** Handle restart request */
	const onRestartHandler = (): void => {
		props.onRestart?.();
		reduxDispatch(GameActions.resetGame());
	};

	console.info("TicToeDisplay render")

	return (<>
		{isGameActive && (playerWon == null) && playerToPlay &&
			<h4>Turn of player {playerToName(playerToPlay)}</h4>
		}
		{playerWon != null &&
			<h4>Player {playerToName(playerWon)} won</h4>
		}
		<button onClick={onRestartHandler}>Restart</button>
	</>);
}

export default TicToeDisplay;
