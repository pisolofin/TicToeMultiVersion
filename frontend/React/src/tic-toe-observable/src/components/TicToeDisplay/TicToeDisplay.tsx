import React, { useContext } from 'react';
import { useObservableState } from 'observable-hooks';
import { TicToeGameObservableService, TicToeGameObservableServiceContext } from '../../services/tic-toe-observable.service';
import { PlayerToPlay } from '../../shared/models/ticToe.model';

const TicToeDisplay: React.FC = () => {
	/** Service for the game */
	const _ticToeGameService: TicToeGameObservableService = useContext(TicToeGameObservableServiceContext);

	/** Game turn for player */
	const playerToPlay	: PlayerToPlay | undefined = useObservableState(_ticToeGameService.player$);
	/** Player won the game */
	const playerWon		: PlayerToPlay | null | undefined = useObservableState(_ticToeGameService.playerWon$);
	/** Active state of the game */
	const isGameActive	: boolean | undefined = useObservableState(_ticToeGameService.isGameActive$);

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
		_ticToeGameService.resetBoard();
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
