import { createAction } from '@reduxjs/toolkit';
import { PlayerToPlay, TicToeCellSate } from '../shared/models/ticToe.model';

export const setPlayerWon		= createAction<PlayerToPlay | null>('game/setPlayerWon');
export const setPlayer			= createAction<PlayerToPlay>('game/setPlayer');
export const togglePlayer		= createAction('game/togglePlayer');
export const setIsGameActive	= createAction<boolean>('game/setIsGameActive');
export const resetGame			= createAction('game/resetGame');

export interface SetCellStateParams {
	rowIndex	: number;
	columnIndex	: number;
	state		: TicToeCellSate;
}
export const setCellState		= createAction<SetCellStateParams>('game/setCellState');
