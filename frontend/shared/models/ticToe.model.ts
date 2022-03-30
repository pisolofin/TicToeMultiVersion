/** Type of the board */
export type TicToeBoardCells = Array<Array<TicToeCellSate>>;

/** State of the cell, Empty if not player set */
export enum TicToeCellSate {
	Empty,
	X,
	O
}

/** Game turn for player */
export enum PlayerToPlay {
	PlayerX	= 1,
	PlayerO = 2
}
