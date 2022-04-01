import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PlayerToPlay } from '../shared/models/ticToe.model';
import { boardReducer, isGameActiveReducer, playerReducer, playerWonReducer } from './game.reducers';

const rootReducer = combineReducers({
	/** Player has won */
	playerWon	: playerWonReducer,
	/** Current player */
	player		: playerReducer,
	/** State of the game. When true, players can play, otherwise the game is stopped */
	isGameActive: isGameActiveReducer,
	/** Board of the game */
	board		: boardReducer
});

export const store = configureStore({
	reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
