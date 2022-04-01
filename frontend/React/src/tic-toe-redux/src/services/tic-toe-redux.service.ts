import { useSelector } from 'react-redux';
import { TicToeBoardCells, TicToeCellSate } from '../shared/models/ticToe.model';
import { TicToeGameUtility } from '../shared/services/tic-toe-game.utility';
import * as GameSelectors from '../redux/game.selectors';
import React from 'react';

export class TicToeGameReduxService {
	/** Utility to manage game */
	private _gameUtility: TicToeGameUtility;

	private _isGameActive	: boolean = useSelector(GameSelectors.selectIsGameActive);

	constructor(initialBoardState: TicToeBoardCells, gameUtility: TicToeGameUtility) {
		console.log("TicToeGameReduxService constructor");

		this._gameUtility = gameUtility;
	}

	/** Check in cell is empty and can change state */
	public canCellChange(rowIndex: number, columnIndex: number): boolean {
		// If game is stopped, noone can play
		if (!this._isGameActive) {
			return false;
		}

//		return this._gameUtility.canCellChange(
//			/* board */			this._boardSubject.getValue(),
//			/* rowIndex */		rowIndex,
//			/* columnIndex */	columnIndex
//		);

		return true;
	}

	/** Return cell state for coordinates */
	public getCellState(rowIndex: number, columnIndex: number): TicToeCellSate {
//		return this._gameUtility.getCellState(
//			/* board */			this._boardSubject.getValue(),
//			/* rowIndex */		rowIndex,
//			/* columnIndex */	columnIndex
//		);

		return TicToeCellSate.Empty;
	}

	/** Set player at the cell */
	public playerPlayed(rowIndex: number, columnIndex: number): void {
//		// If game is stopped, noone can play
//		if (!this._isGameActiveSubject.getValue()) {
//			return ;
//		}		
//
//		const currentBoardState	: TicToeBoardCells 	= this._boardSubject.getValue();
//		const currentPlayer		: PlayerToPlay 		= this._playerSubject.getValue();
//
//		let newBoardState: TicToeBoardCells;
//		// Save current board state
//		switch (currentPlayer) {
//			case PlayerToPlay.PlayerX:
//				this._gameUtility.setCellState(
//					/* board */			this._boardSubject.getValue(),
//					/* rowIndex */		rowIndex,
//					/* columnIndex */	columnIndex,
//					/* state */			TicToeCellSate.X
//				);
//				this._playerSubject.next(PlayerToPlay.PlayerO);
//				break;
//			case PlayerToPlay.PlayerO:
//				this._gameUtility.setCellState(
//					/* board */			this._boardSubject.getValue(),
//					/* rowIndex */		rowIndex,
//					/* columnIndex */	columnIndex,
//					/* state */			TicToeCellSate.O
//				);
//				this._playerSubject.next(PlayerToPlay.PlayerX);
//				break;
//			default:
//				return ;
//		}
//
//		this._boardSubject.next(newBoardState);
	}
}

//	const gameUtility = new TicToeGameUtility();
//	export const TicToeGameReduxServiceContext = React.createContext<TicToeGameReduxService>(
//		new TicToeGameReduxService(
//			/* board */			gameUtility.resetBoard(),
//			/* gameUtility */	gameUtility
//		)
//	);
