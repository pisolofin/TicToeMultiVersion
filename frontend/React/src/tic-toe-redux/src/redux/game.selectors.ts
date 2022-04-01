import { RootState } from './game.store';

export const selectPlayerToPlay	= (state: RootState) => state.player;
export const selectPlayerWon	= (state: RootState) => state.playerWon;
export const selectIsGameActive	= (state: RootState) => state.isGameActive;
export const selectBoard		= (state: RootState) => state.board;
