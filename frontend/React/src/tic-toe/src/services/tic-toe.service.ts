import React, { useCallback } from 'react';
import { PlayerToPlay, TicToeBoardCells, TicToeCellSate } from '../shared/models/ticToe.model';
import { TicToeGameUtility } from '../shared/services/tic-toe-game.utility';

export class TicToeGameService {
	/** Board of the game */
	private _board: TicToeBoardCells;
	/** Utility to manage game */
	private _gameUtility: TicToeGameUtility;

	constructor(board: TicToeBoardCells) {
		console.log("TicToeGameService constructor");
		this._board 		= board;
		this._gameUtility 	= new TicToeGameUtility();
	}

	/** Return a new reset board */
	public resetBoard(): TicToeBoardCells {
		return this._gameUtility.resetBoard();
	}

	/** Check in cell is empty and can change state */
	public canCellChange(rowIndex: number, columnIndex: number): boolean {
		return this._gameUtility.canCellChange(
			/* board */			this._board,
			/* rowIndex */		rowIndex,
			/* columnIndex */	columnIndex
		);
	}

	/** Return cell state for coordinates */
	public getCellState(rowIndex: number, columnIndex: number): TicToeCellSate {
		return this._gameUtility.getCellState(
			/* board */			this._board,
			/* rowIndex */		rowIndex,
			/* columnIndex */	columnIndex
		);
	}

	/** Return a new board with new state */
	public setCellState(rowIndex: number, columnIndex: number, state: TicToeCellSate): TicToeBoardCells {
		return this._gameUtility.setCellState(
			/* board */			this._board,
			/* rowIndex */		rowIndex,
			/* columnIndex */	columnIndex,
			/* state */			state
		);
	}

	/** Return who won or null if nobody won */
	public whoWon(): PlayerToPlay | null {
		return this._gameUtility.whoWon(this._board);
	}
}
/*
const gameUtility = new TicToeGameUtility();
export const TicToeGameServiceContext = React.createContext<TicToeGameService>(
	new TicToeGameService(
		gameUtility.resetBoard()
	)
);
*/