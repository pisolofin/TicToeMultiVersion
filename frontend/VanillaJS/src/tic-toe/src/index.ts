import { TicToeGameUtility } from '../../../../shared/services/tic-toe-game.utility';
import { PlayerToPlay, TicToeBoardCells, TicToeCellSate } from '../../../../shared/models/ticToe.model';

import './style.scss';

// Objects of the view
let _buttonList		: HTMLCollectionOf<HTMLButtonElement>;
let _buttonBoard	: Array<Array<HTMLButtonElement>>;
let _playerLabel	: HTMLHeadingElement;
let _playerWonLabel	: HTMLHeadingElement;
let _restartButton	: HTMLButtonElement;
let _gameStateLabel	: HTMLDivElement;

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
document.addEventListener("DOMContentLoaded", () => {
	_buttonList		= <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("tic-toe-button");
	_playerLabel	= <HTMLHeadingElement>document.getElementsByClassName("tic-toe-player")[0];
	_playerWonLabel	= <HTMLHeadingElement>document.getElementsByClassName("tic-toe-player-won")[0];
	_restartButton	= <HTMLButtonElement>document.getElementsByClassName("tic-toe-restart")[0];
	_gameStateLabel	= <HTMLDivElement>document.getElementsByClassName("tic-toe-game-state")[0];

	_buttonBoard = [];
	// Create buttons board with references
	for (let buttonIndex: number = 0, buttonLength: number = _buttonList.length; buttonIndex < buttonLength; buttonIndex++) {
		// Read game data
		const rowIndex		: number = +_buttonList[buttonIndex].getAttribute("data-row");
		const columnIndex	: number = +_buttonList[buttonIndex].getAttribute("data-column");

		// Create space and reference
		while (_buttonBoard.length <= rowIndex) {
			_buttonBoard.push([]);
		}
		while (_buttonBoard[rowIndex].length <= columnIndex) {
			_buttonBoard[rowIndex].push(null);
		}
		_buttonBoard[rowIndex][columnIndex] = _buttonList[buttonIndex];
	}

	// Setup application objects' events
	setEvents();
	// Set new game
	restartGame();
});

/** Setup events of object */
const setEvents = (): void => {
	for (let buttonIndex: number = 0, buttonLength: number = _buttonList.length; buttonIndex < buttonLength; buttonIndex++) {
		_buttonList[buttonIndex].addEventListener("click", (event: MouseEvent) => {
			// Read game data
			const rowIndex		: number = +(<Element>event.target).getAttribute("data-row");
			const columnIndex	: number = +(<Element>event.target).getAttribute("data-column");
			// Play :)
			cellClickHandler(/* rowIndex */rowIndex, /* columnIndex */columnIndex);
		});
	}

	// On Reset click, start a new game
	_restartButton.addEventListener("click", () => {
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
		_playerLabel.style.display	= "block";
		_playerLabel.innerText		= `Turn of player ${playerToName(_playerToPlay)}`;
	}else {
		_playerLabel.style.display	= "none";
	}

	// Player won label
	if (_playerWon) {
		_playerWonLabel.style.display	= "block";
		_playerWonLabel.innerText		= `Player ${playerToName(_playerWon)} won`;
	}else {
		_playerWonLabel.style.display	= "none";
	}

	// Game state label
	_gameStateLabel.innerText = `Game state: ${_isGameActive ? "active" : "not active"}`;
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
			_buttonBoard[rowIndex][columnIndex].innerText = cellStateToText(_board[rowIndex][columnIndex])
		}
	}
};
