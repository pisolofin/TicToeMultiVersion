import { AnyAction, combineReducers, configureStore, Dispatch, EnhancedStore } from '@reduxjs/toolkit';
import { asyncStatusReducer, boardReducer, isGameActiveReducer, playerONameReducer, playerReducer, playerWonReducer, playerXNameReducer } from './game.reducers';

const gameReducer = combineReducers({
	/** Player has won */
	playerWon	: playerWonReducer,
	/** Current player */
	player		: playerReducer,
	/** State of the game. When true, players can play, otherwise the game is stopped */
	isGameActive: isGameActiveReducer,
	/** Board of the game */
	board		: boardReducer,
	/** Name of player X */
	playerXName	: playerXNameReducer,
	/** Name of player O */
	playerOName	: playerONameReducer,

	asyncStatus	: asyncStatusReducer
});

export type GameState		= ReturnType<typeof gameReducer>;
export type GameStore		= EnhancedStore<GameState, AnyAction, any>;
export type GameDispatcher	= Dispatch<AnyAction>;

export const gameStore: GameStore = configureStore({
	reducer		: gameReducer,
	middleware	: (getDefaultMiddleware) => getDefaultMiddleware().concat(
		
	)
});
