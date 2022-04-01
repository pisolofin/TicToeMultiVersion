import { useObservableState } from 'observable-hooks';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { filter, map, Subscription } from 'rxjs';
import { TicToeGameObservableService, TicToeGameObservableServiceContext } from '../../services/tic-toe-observable.service';
import { PlayerToPlay, TicToeBoardCells } from '../../shared/models/ticToe.model';
import TicToeCell, { TicToeCellClickHandler } from './TicToeCell';
import { useDispatch, useSelector } from 'react-redux';
import * as GameActions from '../../redux/game.actions';
import { store } from '../../redux/game.store';

// Component style
import './TicToeBoard.scss';
import { TicToeGameUtility } from '../../shared/services/tic-toe-game.utility';
import * as GameSelectors from '../../redux/game.selectors';
import { useStorePropChange } from '../../redux/utility';

interface TicToeBoardProps {
	/** Callback when somebody won */
	onWon?: (player: PlayerToPlay) => void;
	/** On player changed */
	onPlayerChanged?: (player: PlayerToPlay) => void;
	/** On active game state changed */
	onIsGameActiveChanged?: (isGameActive: boolean) => void;
}

const TicToeBoard: React.FC<TicToeBoardProps> = (props: TicToeBoardProps) => {
	/** Size of cells */
	const cellWidth: number = 30;

	/** Service for the game */
//	const _ticToeGameService: TicToeGameObservableService = useContext(TicToeGameObservableServiceContext);
//	const _ticToeGameService: TicToeGameReduxService = useContext(TicToeGameReduxServiceContext);
	/** Activation of the game, used for game ended or waiting */
	const isGameActiveRef: React.MutableRefObject<boolean | undefined> = useStorePropChange(store, GameSelectors.selectIsGameActive);
	/** Board of the game */
	const board: TicToeBoardCells = useSelector(GameSelectors.selectBoard);
	/** Game turn for player */
	//	const playerToPlay	: PlayerToPlay | undefined = useObservableState(_ticToeGameService.player$);
//	const playerToPlay	: PlayerToPlay = useSelector(GameSelectors.selectPlayerToPlay);

	/** Redux dispatcher */
	const reduxDispatch = useDispatch();

	const gameUtility: TicToeGameUtility = new TicToeGameUtility();

	/** Cell click handler */
	const cellClickHandler: TicToeCellClickHandler = (rowIndex: number, columnIndex: number): void => {
		console.log("TicToeBoard isGameActiveRef.current: " + isGameActiveRef.current);
		// Check game is active
		if (!isGameActiveRef.current) {
			console.warn("Game not active");
			return ;
		}

//
//		// Check cell can change
//		if (!_ticToeGameService.canCellChange(rowIndex, columnIndex)) {
//			console.warn("Not empty cell");
//			return ;
//		}

//		// Set cell played
//		_ticToeGameService.playerPlayed(
//			/* rowIndex */		rowIndex,
//			/* columnIndex */	columnIndex
//		);

//		reduxDispatch(GameActions.setPlayer(PlayerToPlay.PlayerO));
		reduxDispatch(GameActions.togglePlayer());
//
		if (rowIndex && columnIndex) {
			reduxDispatch(GameActions.setPlayerWon(PlayerToPlay.PlayerO));
			reduxDispatch(GameActions.setIsGameActive(false));
		}

		console.log("TicToeBoard isGameActiveRef.current: " + isGameActiveRef.current);
	};

//	// Subscribe to re-render component on board change
//	useObservableState(_ticToeGameService.board$);

//	// Subscriptions
//	useEffect(() => {
//		// When active game state changed
//		const isGameActiveSubscription: Subscription = _ticToeGameService.isGameActive$.subscribe((isGameActive: boolean) => {
//			// Update local reference
//			isGameActiveRef.current = isGameActive;
//			// Call callback
//			props.onIsGameActiveChanged?.(isGameActive);
//		});
//		// When user changed
//		const playerSubscription: Subscription = _ticToeGameService.player$.subscribe((player: PlayerToPlay) => {
//			props.onPlayerChanged?.(player);
//		});
//		// When someone won
//		const playerWonSubscription: Subscription = _ticToeGameService.playerWon$
//			.pipe(
//				filter((player: PlayerToPlay | null): boolean => {
//					return player != null;
//				}),
//				map((player: PlayerToPlay | null): PlayerToPlay => {
//					return player as PlayerToPlay;
//				})
//			)
//			.subscribe((player: PlayerToPlay) => {
//				props.onWon?.(player);
//			})
//		;
//
//		return () => {
//			isGameActiveSubscription.unsubscribe();
//			playerSubscription.unsubscribe();
//			playerWonSubscription.unsubscribe();
//		};
//	}, [props, props.onWon, _ticToeGameService.isGameActive$, _ticToeGameService.board$, _ticToeGameService.player$, _ticToeGameService.playerWon$]);

	console.info("TicToeBoard render");

	return (<>
		<div className="cells-row">
			<TicToeCell rowIndex={0} columnIndex={0} width={cellWidth} state={gameUtility.getCellState(board, 0, 0)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={0} columnIndex={1} width={cellWidth} state={gameUtility.getCellState(board, 0, 1)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={0} columnIndex={2} width={cellWidth} state={gameUtility.getCellState(board, 0, 2)} onClick={cellClickHandler} />
		</div>
		<div className="cells-row">
			<TicToeCell rowIndex={1} columnIndex={0} width={cellWidth} state={gameUtility.getCellState(board, 1, 0)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={1} columnIndex={1} width={cellWidth} state={gameUtility.getCellState(board, 1, 1)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={1} columnIndex={2} width={cellWidth} state={gameUtility.getCellState(board, 1, 2)} onClick={cellClickHandler} />
		</div>
		<div className="cells-row">
			<TicToeCell rowIndex={2} columnIndex={0} width={cellWidth} state={gameUtility.getCellState(board, 2, 0)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={2} columnIndex={1} width={cellWidth} state={gameUtility.getCellState(board, 2, 1)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={2} columnIndex={2} width={cellWidth} state={gameUtility.getCellState(board, 2, 2)} onClick={cellClickHandler} />
		</div>
	</>);
};

export default TicToeBoard;
