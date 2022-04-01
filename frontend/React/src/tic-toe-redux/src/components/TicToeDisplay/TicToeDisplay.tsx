import React, { useContext } from 'react';
import { useObservableState } from 'observable-hooks';
import { useSelector } from 'react-redux';
import { TicToeGameObservableService, TicToeGameObservableServiceContext } from '../../services/tic-toe-observable.service';
import { PlayerToPlay } from '../../shared/models/ticToe.model';
import { RootState } from '../../redux/game.store';
import * as GameActions from '../../redux/game.actions';
import { useDispatch } from 'react-redux';
import * as GameSelectors from '../../redux/game.selectors';

interface TicToeDisplayProps {
	onRestart?		: () => void;
}

const TicToeDisplay: React.FC<TicToeDisplayProps> = (props: TicToeDisplayProps) => {
//	/** Service for the game */
//	const _ticToeGameService: TicToeGameObservableService = useContext(TicToeGameObservableServiceContext);

	/** Game turn for player */
//	const playerToPlay	: PlayerToPlay | undefined = useObservableState(_ticToeGameService.player$);
	const playerToPlay	: PlayerToPlay = useSelector(GameSelectors.selectPlayerToPlay);
	/** Board state */
//	const playerWon		: PlayerToPlay | null | undefined = useObservableState(_ticToeGameService.playerWon$);
	const playerWon		: PlayerToPlay | null = useSelector(GameSelectors.selectPlayerWon);
	/** Active state of the game */
//	const isGameActive	: boolean | undefined = useObservableState(_ticToeGameService.isGameActive$);
	const isGameActive	: boolean = useSelector(GameSelectors.selectIsGameActive);

	const reduxDispatch = useDispatch();

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
