import { createReducer } from '@reduxjs/toolkit';
import { PlayerToPlay, TicToeBoardCells } from '../shared/models/ticToe.model';
import { TicToeGameUtility } from '../shared/services/tic-toe-game.utility';
import { resetGame, setCellState, setIsGameActive, setPlayer, setPlayerOName, setPlayerWon, setPlayerXName, togglePlayer } from './game.actions';

// Services
const gameUtility = new TicToeGameUtility();

// Reducers
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

export const boardReducer = createReducer(gameUtility.resetBoard(), builder => builder
	.addCase(setCellState, (state, action) => {
		const newBoardState: TicToeBoardCells = gameUtility.setCellState(
			/* board */			state,
			/* rowIndex */		action.payload.rowIndex,
			/* columnIndex */	action.payload.columnIndex,
			/* state */			action.payload.state
		);
		return newBoardState;
	})
	.addCase(resetGame, () => gameUtility.resetBoard())
);

export const playerXNameReducer = createReducer(<string | null>null, builder => builder
	.addCase(setPlayerXName, (state, action) => action.payload)
);

export const playerONameReducer = createReducer(<string | null>null, builder => builder
	.addCase(setPlayerOName, (state, action) => action.payload)
);
