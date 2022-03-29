import React, { useCallback } from 'react';
import { PlayerToPlay, TicToeBoardCells, TicToeCellSate } from '../shared/models/ticToe.model';
import { TicToeGameUtility } from '../shared/services/tic-toe-game.utility';

export class TicToeGameService {
	private _board: TicToeBoardCells;

	constructor(board: TicToeBoardCells) {
		console.log("TicToeGameService constructor");
		this._board = board;
	}

	/** Return a new reset board */
	public resetBoard(): TicToeBoardCells {
		const newBoardState: TicToeBoardCells = [];
		// Create all rows
		for (let boardRowIndex = 0; boardRowIndex < this._board.length; boardRowIndex++) {
			newBoardState.push([]);
			// Create all columns for row
			for (let boardColumnIndex = 0; boardColumnIndex < this._board[boardRowIndex].length; boardColumnIndex++) {
				newBoardState[boardRowIndex].push(TicToeCellSate.Empty);
			}
		}

		return newBoardState;
	}

	/** Check in cell is empty and can change state */
	public canCellChange(rowIndex: number, columnIndex: number): boolean {
		return this._board[rowIndex][columnIndex] === TicToeCellSate.Empty;
	}

	/** Return cell state for coordinates */
	public getCellState(rowIndex: number, columnIndex: number): TicToeCellSate {
		return this._board[rowIndex][columnIndex];
	}

	/** Return a new board with new state */
	public setCellState(rowIndex: number, columnIndex: number, state: TicToeCellSate): TicToeBoardCells {
		// TODO: Do a deep copy
		const newBoardState: TicToeBoardCells = Object.assign([], this._board);
		newBoardState[rowIndex][columnIndex] = state;

		return newBoardState;
	}

	/** Check if selected player won */
	private hasPlayerWon(player: PlayerToPlay): boolean {
		const cellState: TicToeCellSate = player === PlayerToPlay.PlayerX
			? TicToeCellSate.X
			: TicToeCellSate.O
		;

		return (
			((this._board[0][0] === cellState) && (this._board[0][1] === cellState) && (this._board[0][2] === cellState)) ||
			((this._board[1][0] === cellState) && (this._board[1][1] === cellState) && (this._board[1][2] === cellState)) ||
			((this._board[2][0] === cellState) && (this._board[2][1] === cellState) && (this._board[2][2] === cellState)) ||

			((this._board[0][0] === cellState) && (this._board[1][0] === cellState) && (this._board[2][0] === cellState)) ||
			((this._board[0][1] === cellState) && (this._board[1][1] === cellState) && (this._board[2][1] === cellState)) ||
			((this._board[0][2] === cellState) && (this._board[1][2] === cellState) && (this._board[2][2] === cellState)) ||

			((this._board[0][0] === cellState) && (this._board[1][1] === cellState) && (this._board[2][2] === cellState)) ||
			((this._board[0][2] === cellState) && (this._board[1][1] === cellState) && (this._board[2][0] === cellState))
		);
	}

	/** Return who won or null if nobody won */
	public whoWon(): PlayerToPlay | null {
		// Check il somebody won
		if (this.hasPlayerWon(PlayerToPlay.PlayerX)) {
			return PlayerToPlay.PlayerX;
		}else if (this.hasPlayerWon(PlayerToPlay.PlayerO)) {
			return PlayerToPlay.PlayerO;
		}

		return null;
	}
}

const gameUtility = new TicToeGameUtility();
export const TicToeGameServiceContext = React.createContext<TicToeGameService>(
	new TicToeGameService(
		gameUtility.resetBoard()
	)
);
