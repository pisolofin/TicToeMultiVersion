import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import TicToeCell, { TicToeCellClickHandler } from './TicToeCell';
import { PlayerToPlay, TicToeCellSate, TicToeBoardCells } from '../../shared/models/ticToe.model';
import { TicToeGameService } from '../../services/tic-toe.service';

// Component style
import './TicToeBoard.scss'

interface TicToeBoardProps {
	/** Callback when somebody won */
	onWon?: (player: PlayerToPlay) => void;
	/** On player changed */
	onPlayerChanged?: (player: PlayerToPlay) => void;
	/** On activation of the game changed */
	onIsGameActiveChanged?: (isGameActive: boolean) => void;
}

interface TicToeBoardRef {
	/** Reset the game to initial state */
	resetGame: () => void;
}

const TicToeBoard: React.ForwardRefRenderFunction<TicToeBoardRef, TicToeBoardProps> = (props: TicToeBoardProps, reference: ForwardedRef<TicToeBoardRef>) => {
	const cellWidth: number = 30;
	/** Game turn for player */
	const [playerToPlay, setPlayerToPlay] = useState<PlayerToPlay>(PlayerToPlay.PlayerX);
	/** Board state */
	const [boardState, setBoardState] = useState<TicToeBoardCells>(
		[
			[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
			[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
			[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty]
		]
	);
	/** Activation of the game, used for game ended or waiting */
	const [isGameActive, setIsGameActive] = useState<boolean>(true);
	/** Service for the game */
	const _ticToeGameService: TicToeGameService = new TicToeGameService(boardState);

	/** Cell click handler */
	const cellClickHandler: TicToeCellClickHandler = (rowIndex: number, columnIndex: number): void => {
		if (!isGameActive) {
			console.warn("Game not active");
			return ;
		}

		if (!_ticToeGameService.canCellChange(rowIndex, columnIndex)) {
			console.warn("Not empty cell");
			return ;
		}

		let nextPlayer		: PlayerToPlay;
		let newBoardState	: TicToeBoardCells;
		// Set state ad the board
		switch (playerToPlay) {
			case PlayerToPlay.PlayerX:
				newBoardState = _ticToeGameService.setCellState(rowIndex/* rowIndex */, columnIndex /* columnIndex */, TicToeCellSate.X/* state */);
				nextPlayer = PlayerToPlay.PlayerO;
				break;
			case PlayerToPlay.PlayerO:
				newBoardState = _ticToeGameService.setCellState(rowIndex/* rowIndex */, columnIndex /* columnIndex */, TicToeCellSate.O/* state */);
				nextPlayer = PlayerToPlay.PlayerX;
				break;
		}
		// Update board state
		setBoardState(newBoardState);
		// Change player turn
		setPlayerToPlay(nextPlayer);
	};

	// When board state change, check if someone won
	useEffect(() => {
		const whoWon: PlayerToPlay | null = _ticToeGameService.whoWon();
		// If somebody won stop game, fire event
		if (whoWon != null) {
			props.onWon?.(whoWon);

			setIsGameActive(false);
		}
	}, [boardState]);

	// When user changed
	useEffect(() => {
		props.onPlayerChanged?.(playerToPlay);
	}, [playerToPlay]);

	// When activation of the game changed
	useEffect(() => {
		props.onIsGameActiveChanged?.(isGameActive);
	}, [isGameActive]);

	// Setup reference of the object
	useImperativeHandle(
		reference,
		(): TicToeBoardRef => ({
			/** Reset the game to initial state */
			resetGame: () => {
				setBoardState(
					[
						[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
						[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
						[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty]
					]			
				);
				setPlayerToPlay(PlayerToPlay.PlayerX);
				setIsGameActive(true);
			}
		} as TicToeBoardRef)
	);

	console.info("TicToeBoard render");

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

export default forwardRef(TicToeBoard);
