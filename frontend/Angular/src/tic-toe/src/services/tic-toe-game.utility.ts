import { PlayerToPlay, TicToeBoardCells, TicToeCellSate } from '../models/ticToe.model';

export class TicToeGameUtility {
	private static boardWidth	: number = 3
	private static boardHeight	: number = 3

	/** Return a new reset board */
	public resetBoard(): TicToeBoardCells {
		const newBoardState: TicToeBoardCells = [];
		// Create all rows
		for (let boardRowIndex = 0; boardRowIndex < TicToeGameUtility.boardHeight; boardRowIndex++) {
			newBoardState.push([]);
			// Create all columns for row
			for (let boardColumnIndex = 0; boardColumnIndex < TicToeGameUtility.boardWidth; boardColumnIndex++) {
				newBoardState[boardRowIndex].push(TicToeCellSate.Empty);
			}
		}

		return newBoardState;
	}

	/** Check in cell is empty and can change state */
	public canCellChange(board: TicToeBoardCells, rowIndex: number, columnIndex: number): boolean {
		return board[rowIndex][columnIndex] === TicToeCellSate.Empty;
	}

	/** Return cell state for coordinates */
	public getCellState(board: TicToeBoardCells, rowIndex: number, columnIndex: number): TicToeCellSate {
		return board[rowIndex][columnIndex];
	}

	/** Return a new board with new state */
	public setCellState(board: TicToeBoardCells, rowIndex: number, columnIndex: number, state: TicToeCellSate): TicToeBoardCells {
		// TODO: Handle no 3 size board
		const newBoardState: TicToeBoardCells = [
			Object.assign([], board[0]),
			Object.assign([], board[1]),
			Object.assign([], board[2])
		];
		newBoardState[rowIndex][columnIndex] = state;

		return newBoardState;
	}

	/** Check if selected player won */
	private hasPlayerWon(board: TicToeBoardCells, player: PlayerToPlay): boolean {
		const cellState: TicToeCellSate = player === PlayerToPlay.PlayerX
			? TicToeCellSate.X
			: TicToeCellSate.O
		;

		// TODO: Handle no 3 size board
		return (
			((board[0][0] === cellState) && (board[0][1] === cellState) && (board[0][2] === cellState)) ||
			((board[1][0] === cellState) && (board[1][1] === cellState) && (board[1][2] === cellState)) ||
			((board[2][0] === cellState) && (board[2][1] === cellState) && (board[2][2] === cellState)) ||

			((board[0][0] === cellState) && (board[1][0] === cellState) && (board[2][0] === cellState)) ||
			((board[0][1] === cellState) && (board[1][1] === cellState) && (board[2][1] === cellState)) ||
			((board[0][2] === cellState) && (board[1][2] === cellState) && (board[2][2] === cellState)) ||

			((board[0][0] === cellState) && (board[1][1] === cellState) && (board[2][2] === cellState)) ||
			((board[0][2] === cellState) && (board[1][1] === cellState) && (board[2][0] === cellState))
		);
	}

	/** Return who won or null if nobody won */
	public whoWon(board: TicToeBoardCells): PlayerToPlay | null {
		// Check il somebody won
		if (this.hasPlayerWon(board, PlayerToPlay.PlayerX)) {
			return PlayerToPlay.PlayerX;
		}else if (this.hasPlayerWon(board, PlayerToPlay.PlayerO)) {
			return PlayerToPlay.PlayerO;
		}

		return null;
	}
}
