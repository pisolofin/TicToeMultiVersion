import { createReducer } from '@reduxjs/toolkit';
import { PlayerToPlay } from '../shared/models/ticToe.model';
import { TicToeGameUtility } from '../shared/services/tic-toe-game.utility';
import { resetGame, setCellState, setIsGameActive, setPlayer, setPlayerWon, togglePlayer } from './game.actions';

export const playerWonReducer = createReducer(null as PlayerToPlay | null, builder => builder
	.addCase(setPlayerWon, (state, action) => action.payload)
	.addCase(resetGame, () => setPlayerWon(null).payload)
);

export const playerReducer = createReducer(PlayerToPlay.PlayerX, builder => builder
	.addCase(setPlayer, (state, action) => action.payload)
	.addCase(togglePlayer, (state) => {
		if (state === PlayerToPlay.PlayerX) {
			return PlayerToPlay.PlayerO;
		}else if (state === PlayerToPlay.PlayerO) {
			return PlayerToPlay.PlayerX;
		}
		// Default case
		return PlayerToPlay.PlayerX;
	})
	.addCase(resetGame, () => setPlayer(PlayerToPlay.PlayerX).payload)
);

export const isGameActiveReducer = createReducer(true, builder => builder
	.addCase(setIsGameActive, (state, action) => action.payload)
	.addCase(resetGame, () => setIsGameActive(true).payload)
);

const gameUtility = new TicToeGameUtility();
export const boardReducer = createReducer(gameUtility.resetBoard(), builder => builder
	.addCase(setCellState, (state, action) => {
		return gameUtility.setCellState(
			/* board */			state,
			/* rowIndex */		action.payload.rowIndex,
			/* columnIndex */	action.payload.columnIndex,
			/* state */			action.payload.state
		)
	})
	.addCase(resetGame, () => gameUtility.resetBoard())
);
