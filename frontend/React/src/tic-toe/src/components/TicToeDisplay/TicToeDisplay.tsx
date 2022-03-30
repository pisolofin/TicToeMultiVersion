import React, { useContext, useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { TicToeGameObservableService, TicToeGameObservableServiceContext } from '../../services/tic-toe-observable.service';
import { PlayerToPlay } from '../../shared/models/ticToe.model';

interface TicToeDisplayProps {
//	isGameActive	: boolean;
//	playerToPlay	: PlayerToPlay;
//	playerWon		: PlayerToPlay | null;
	onRestart?		: () => void;
}

const TicToeDisplay: React.FC<TicToeDisplayProps> = (props: TicToeDisplayProps) => {
	/** Game turn for player */
	const [playerToPlay, setPlayerToPlay] = useState<PlayerToPlay>(PlayerToPlay.PlayerX);
	/** Board state */
	const [playerWon, setPlayerWon] = useState<PlayerToPlay | null>(null);
	/** Active state of the game */
	const [isGameActive, setIsGameActive] = useState<boolean>(true);

	/** Service for the game */
	const _ticToeGameService: TicToeGameObservableService = useContext(TicToeGameObservableServiceContext);

	// Subscriptions
	useEffect(() => {
		// When active game state changed
		const isGameActiveSubscription: Subscription = _ticToeGameService.isGameActive$.subscribe((isGameActive: boolean) => {
			setIsGameActive(isGameActive);
		});
		// When user changed
		const playerSubscription: Subscription = _ticToeGameService.player$.subscribe((player: PlayerToPlay) => {
			setPlayerToPlay(player);
		});
		// When someone won
		const playerWonSubscription: Subscription = _ticToeGameService.playerWon$.subscribe((player: PlayerToPlay | null) => {
			setPlayerWon(player);
		});

		return () => {
			isGameActiveSubscription.unsubscribe();
			playerSubscription.unsubscribe();
			playerWonSubscription.unsubscribe();
		};
	}, []);

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
		{isGameActive && (playerWon == null) &&
			<h4>Turn of player {playerToName(playerToPlay)}</h4>
		}
		{playerWon != null &&
			<h4>Player {playerToName(playerWon)} won</h4>
		}
		{/* <button onClick={onRestartHandler}>Restart</button> */}
	</>);
}

export default TicToeDisplay;
