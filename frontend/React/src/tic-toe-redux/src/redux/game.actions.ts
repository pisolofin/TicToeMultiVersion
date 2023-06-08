import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PlayerToPlay, TicToeCellSate } from '../shared/models/ticToe.model';

export const setPlayerWon		= createAction<PlayerToPlay | null>('game/setPlayerWon');
export const setPlayer			= createAction<PlayerToPlay>('game/setPlayer');
export const togglePlayer		= createAction('game/togglePlayer');
export const setIsGameActive	= createAction<boolean>('game/setIsGameActive');
export const resetGame			= createAction('game/resetGame');
export const setPlayerXName		= createAction<string>('configuration/setPlayerXName');
export const setPlayerOName		= createAction<string>('configuration/setPlayerOName');

export const calculateAsync		= createAsyncThunk<string, number>('game/calculateAsync', (arg: number) => {
	return new Promise((resolve, reject) => {
		console.log('calculateAsync start');
		setTimeout(() => {
			console.log('calculateAsync resolved');
			resolve('Risolto ' + arg);
		}, 3000);
	});
});

export interface SetCellStateParams {
	rowIndex	: number;
	columnIndex	: number;
	state		: TicToeCellSate;
}
export const setCellState		= createAction<SetCellStateParams>('game/setCellState');
