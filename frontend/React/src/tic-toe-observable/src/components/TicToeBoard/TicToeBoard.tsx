import React, { useContext, useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { TicToeGameObservableService, TicToeGameObservableServiceContext } from '../../services/tic-toe-observable.service';
import { PlayerToPlay, TicToeBoardCells } from '../../shared/models/ticToe.model';
import TicToeCell, { TicToeCellClickHandler } from './TicToeCell';

// Component style
import './TicToeBoard.scss';

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

	/** Board state */
	const [, setBoardState] = useState<TicToeBoardCells>();
	/** Activation of the game, used for game ended or waiting */
	const [isGameActive, setIsGameActive] = useState<boolean>(true);

	/** Service for the game */
	const _ticToeGameService: TicToeGameObservableService = useContext(TicToeGameObservableServiceContext);

	/** Cell click handler */
	const cellClickHandler: TicToeCellClickHandler = (rowIndex: number, columnIndex: number): void => {
		// Check game is active
		if (!isGameActive) {
			console.warn("Game not active");
			return ;
		}

		// Check cell can change
		if (!_ticToeGameService.canCellChange(rowIndex, columnIndex)) {
			console.warn("Not empty cell");
			return ;
		}

		// Set cell played
		_ticToeGameService.playerPlayed(
			/* rowIndex */		rowIndex,
			/* columnIndex */	columnIndex
		);
	};

	// Subscriptions
	useEffect(() => {
		// When active game state changed
		const isGameActiveSubscription: Subscription = _ticToeGameService.isGameActive$.subscribe((isGameActive: boolean) => {
			setIsGameActive(isGameActive);
			props.onIsGameActiveChanged?.(isGameActive);
		});
		// When active game state changed
		const boardSubscription: Subscription = _ticToeGameService.board$.subscribe((boardNewState: TicToeBoardCells) => {
			setBoardState(boardNewState);
		});
		// When user changed
		const playerSubscription: Subscription = _ticToeGameService.player$.subscribe((player: PlayerToPlay) => {
			props.onPlayerChanged?.(player);
		});
		// When someone won
		const playerWonSubscription: Subscription = _ticToeGameService.playerWon$.subscribe((player: PlayerToPlay | null) => {
			if (player != null) {
				props.onWon?.(player);
			}
		});

		return () => {
			isGameActiveSubscription.unsubscribe();
			boardSubscription.unsubscribe();
			playerSubscription.unsubscribe();
			playerWonSubscription.unsubscribe();
		};
	}, []);

	return (<>
		<div className="cells-row">
			<TicToeCell rowIndex={0} columnIndex={0} width={cellWidth} state={_ticToeGameService.getCellState(0, 0)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={0} columnIndex={1} width={cellWidth} state={_ticToeGameService.getCellState(0, 1)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={0} columnIndex={2} width={cellWidth} state={_ticToeGameService.getCellState(0, 2)} onClick={cellClickHandler} />
		</div>
		<div className="cells-row">
			<TicToeCell rowIndex={1} columnIndex={0} width={cellWidth} state={_ticToeGameService.getCellState(1, 0)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={1} columnIndex={1} width={cellWidth} state={_ticToeGameService.getCellState(1, 1)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={1} columnIndex={2} width={cellWidth} state={_ticToeGameService.getCellState(1, 2)} onClick={cellClickHandler} />
		</div>
		<div className="cells-row">
			<TicToeCell rowIndex={2} columnIndex={0} width={cellWidth} state={_ticToeGameService.getCellState(2, 0)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={2} columnIndex={1} width={cellWidth} state={_ticToeGameService.getCellState(2, 1)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={2} columnIndex={2} width={cellWidth} state={_ticToeGameService.getCellState(2, 2)} onClick={cellClickHandler} />
		</div>
	</>);
};

export default TicToeBoard;
