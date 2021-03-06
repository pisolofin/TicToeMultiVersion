import { GameState } from './game.store';

export const selectPlayerToPlay	= (state: GameState) => state.player;
export const selectPlayerWon	= (state: GameState) => state.playerWon;
export const selectIsGameActive	= (state: GameState) => state.isGameActive;
export const selectBoard		= (state: GameState) => state.board;
