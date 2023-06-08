import React from 'react';
import * as GameActions from '../redux/game.actions';
import * as GameSelectors from '../redux/game.selectors';
import { GameStore, gameStore } from '../redux/game.store';
import { PlayerToPlay, TicToeBoardCells, TicToeCellSate } from '../shared/models/ticToe.model';
import { TicToeGameUtility } from '../shared/services/tic-toe-game.utility';

export class TicToeGameReduxService {
	/** Utility to manage game */
	private _gameUtility	: TicToeGameUtility;
	/** Store of state manager */
	private _store			: GameStore;

	/** Board of the game */
	private get _board()		: TicToeBoardCells	{ return GameSelectors.selectBoard(this._store.getState()); }
	/** Current player */
	private get _player()		: PlayerToPlay		{ return GameSelectors.selectPlayerToPlay(this._store.getState()); }
	/** State of the game. When true, players can play, otherwise the game is stopped */
	private get _isGameActive()	: boolean			{ return GameSelectors.selectIsGameActive(this._store.getState()); }

	constructor(gameUtility: TicToeGameUtility, store: GameStore) {
		console.log("TicToeGameReduxService constructor");

		this._gameUtility	= gameUtility;
		this._store			= store;
	}

	/** Check in cell is empty and can change state */
	public canCellChange(rowIndex: number, columnIndex: number): boolean {
		// If game is stopped, noone can play
		if (!this._isGameActive) {
			return false;
		}

		return this._gameUtility.canCellChange(
			/* board */			this._board,
			/* rowIndex */		rowIndex,
			/* columnIndex */	columnIndex
		);
	}

	/** Return cell state for coordinates */
	public getCellState(rowIndex: number, columnIndex: number): TicToeCellSate {
		return this._gameUtility.getCellState(
			/* board */			this._board,
			/* rowIndex */		rowIndex,
			/* columnIndex */	columnIndex
		);
	}

	/** Set player at the cell */
	public playerPlayed(rowIndex: number, columnIndex: number): void {
		// Check if cell can change
		if (!this.canCellChange(rowIndex, columnIndex)) {
			return ;
		}

		// Save current board state
		switch (this._player) {
			case PlayerToPlay.PlayerX:
				this._store.dispatch(GameActions.setCellState({
					rowIndex	: rowIndex,
					columnIndex	: columnIndex,
					state		: TicToeCellSate.X
				} as GameActions.SetCellStateParams));
				this._store.dispatch(GameActions.setPlayer(PlayerToPlay.PlayerO));
				break;
			case PlayerToPlay.PlayerO:
				this._store.dispatch(GameActions.setCellState({
					rowIndex	: rowIndex,
					columnIndex	: columnIndex,
					state		: TicToeCellSate.O
				} as GameActions.SetCellStateParams));
				this._store.dispatch(GameActions.setPlayer(PlayerToPlay.PlayerX));
				break;
		}

		// Check who won
		const whoWon: PlayerToPlay | null = this._gameUtility.whoWon(
			GameSelectors.selectBoard(this._store.getState())
		)
		if (whoWon !== null) {
			this._store.dispatch(GameActions.setPlayerWon(whoWon));
			this._store.dispatch(GameActions.setIsGameActive(false));
		}
	}

	public calculateAsyncAction() {
		this._store.dispatch(GameActions.calculateAsync(2) as any);
	}
}

const gameUtility = new TicToeGameUtility();
export const TicToeGameReduxServiceContext = React.createContext<TicToeGameReduxService>(
	new TicToeGameReduxService(
		/* gameUtility */	gameUtility,
		/* store */			gameStore
	)
);
