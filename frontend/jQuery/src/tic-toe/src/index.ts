import * as $ from 'jquery';
import { TicToeGameUtility } from '../../../../shared/services/tic-toe-game.utility';
import { PlayerToPlay, TicToeBoardCells, TicToeCellSate } from '../../../../shared/models/ticToe.model';

import './style.scss';

// Objects of the view
let _$buttonList		: JQuery<HTMLButtonElement>;
let _$playerLabel		: JQuery<HTMLElement>;
let _$playerWonLabel	: JQuery<HTMLElement>;
let _$restartButton		: JQuery<HTMLButtonElement>;
let _$gameStateLabel	: JQuery<HTMLElement>;

// Game's state

/** Game turn for player */
let _playerToPlay	: PlayerToPlay;
/** Player won the game */
let _playerWon		: PlayerToPlay | null;
/** Activation of the game, used for game ended or waiting */
let _isGameActive	: boolean;

/** Board of the game */
let _board: TicToeBoardCells;
/** Game utility */
const _ticToeGameUtility: TicToeGameUtility = new TicToeGameUtility();

// Page ready, reference to dom elements
$(() => {
	_$buttonList		= $(".tic-toe-button");
	_$playerLabel		= $(".tic-toe-player");
	_$playerWonLabel	= $(".tic-toe-player-won");
	_$restartButton		= $(".tic-toe-restart");
	_$gameStateLabel	= $(".tic-toe-game-state");

	// Setup application objects' events
	setEvents();
	// Set new game
	restartGame();
});

/** Setup events of object */
const setEvents = (): void => {
	_$buttonList.on("click", (event: JQuery.ClickEvent<HTMLButtonElement>) => {
		const $ticToeCell: JQuery<HTMLButtonElement> = $(event.currentTarget);
		// Read game data
		const rowIndex		: number = $ticToeCell.data("row");
		const columnIndex	: number = $ticToeCell.data("column");
		// Play :)
		cellClickHandler(/* rowIndex */rowIndex, /* columnIndex */columnIndex);
	});

	// On Reset click, start a new game
	_$restartButton.on("click", () => {
		restartGame();
	});
};

/** Restart game with empty board */
const restartGame = () => {
	_isGameActive	= true;
	_playerToPlay	= PlayerToPlay.PlayerX;
	_playerWon		= null;
	_board			= [
		[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
		[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
		[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty]
	];	

	// Update view
	updateGameCells();
	updateGameLabels();
};

/** Cell click handler */
const cellClickHandler = (rowIndex: number, columnIndex: number): void => {
	// Check game is active
	if (!_isGameActive) {
		console.warn("Game not active");
		return ;
	}

	// Check cell can change
	if (!_ticToeGameUtility.canCellChange(
		/* board */			_board,
		/* rowIndex */		rowIndex,
		/* columnIndex */	columnIndex
	)) {
		console.warn("Not empty cell");
		return ;
	}

	// Set cell played
	switch (_playerToPlay) {
		case PlayerToPlay.PlayerX:
			_board = _ticToeGameUtility.setCellState(
				/* board */			_board,
				/* rowIndex */		rowIndex,
				/* columnIndex */	columnIndex,
				/* state */			TicToeCellSate.X
			);
			_playerToPlay = PlayerToPlay.PlayerO;
			break;
		case PlayerToPlay.PlayerO:
			_board = _ticToeGameUtility.setCellState(
				/* board */			_board,
				/* rowIndex */		rowIndex,
				/* columnIndex */	columnIndex,
				/* state */			TicToeCellSate.O
			);
			_playerToPlay = PlayerToPlay.PlayerX;
			break;
	}

	// Check if someone won
	const whoWon: PlayerToPlay | null = _ticToeGameUtility.whoWon(_board);
	// If someone won, emit event
	if (whoWon != null) {
		_playerWon = whoWon;
		// Stop the game
		_isGameActive = false;
	}

	// Update view
	updateGameCells();
	updateGameLabels();
};

/** Return the name of the player */
const playerToName = (player: PlayerToPlay): string => {
	switch (player) {
		case PlayerToPlay.PlayerX:
			return "X";
		case PlayerToPlay.PlayerO:
			return "O";
		default:
			return "";
	}
};

/** Updates labels of the game with game state */
const updateGameLabels = (): void => {
	// Player label
	if (_isGameActive && (_playerWon === null) && _playerToPlay) {
		_$playerLabel.show();
		_$playerLabel.text(`Turn of player ${playerToName(_playerToPlay)}`);
	}else {
		_$playerLabel.hide();
	}

	// Player won label
	if (_playerWon) {
		_$playerWonLabel.show();
		_$playerWonLabel.text(`Player ${playerToName(_playerWon)} won`);
	}else {
		_$playerWonLabel.hide();
	}

	// Game state label
	_$gameStateLabel.text(`Game state: ${_isGameActive ? "active" : "not active"}`);
};

/** Convert CellState to text */
const cellStateToText = (cellState: TicToeCellSate): string => {
	switch (cellState) {
		case TicToeCellSate.Empty:
		default:
			return ' ';
		case TicToeCellSate.X:
			return 'X';
		case TicToeCellSate.O:
			return 'O';
	}
};

/** Update cells with board state */
const updateGameCells = (): void => {
	for (let rowIndex = 0, rowListLength = _board.length; rowIndex < rowListLength; rowIndex++) {
		for (let columnIndex = 0, columnListLength = _board[rowIndex].length; columnIndex < columnListLength; columnIndex++) {
			_$buttonList.filter(`[data-row="${rowIndex}"][data-column="${columnIndex}"]`).text(
				cellStateToText(_board[rowIndex][columnIndex])
			);
		}
	}
};
