import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import * as GameSelectors from '../../redux/game.selectors';
import { gameStore } from '../../redux/game.store';
import { useStorePropChange } from '../../redux/utility';
import { TicToeGameReduxService, TicToeGameReduxServiceContext } from '../../services/tic-toe-redux.service';
import { PlayerToPlay } from '../../shared/models/ticToe.model';
import TicToeCell, { TicToeCellClickHandler } from './TicToeCell';

// Component style
import './TicToeBoard.scss';

interface TicToeBoardProps {
	/** Callback when somebody won */
	onWon?: (player: PlayerToPlay) => void;
	/** On player changed */
	onPlayerChanged?: (player: PlayerToPlay) => void;
	/** On active game state changed */
	onIsGameActiveChanged?: (isGameActive: boolean) => void;
}

const TicToeBoard: React.FC<TicToeBoardProps> = (props: TicToeBoardProps) => {
	/** Size of cells */
	const cellWidth: number = 30;

	/** Service for the game */
	const _ticToeGameService: TicToeGameReduxService = useContext(TicToeGameReduxServiceContext);
	/** Activation of the game, used for game ended or waiting */
	const isGameActiveRef: React.MutableRefObject<boolean | undefined> = useStorePropChange(gameStore, GameSelectors.selectIsGameActive);

	/** Cell click handler */
	const cellClickHandler: TicToeCellClickHandler = (rowIndex: number, columnIndex: number): void => {
		// Check game is active
		if (!isGameActiveRef.current) {
			console.warn("Game not active");
			return ;
		}

		// Check cell can change
		if (!_ticToeGameService.canCellChange(rowIndex, columnIndex)) {
			console.warn("Not empty cell");
			return ;
		}

		// Set cell played
		_ticToeGameService.playerPlayed(
			/* rowIndex */		rowIndex,
			/* columnIndex */	columnIndex
		);
	};

	// Subscribe to re-render component on board change
	useSelector(GameSelectors.selectBoard);

	console.info("TicToeBoard render");

	return (<>
		<div className="cells-row">
			<TicToeCell rowIndex={0} columnIndex={0} width={cellWidth} state={_ticToeGameService.getCellState(0, 0)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={0} columnIndex={1} width={cellWidth} state={_ticToeGameService.getCellState(0, 1)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={0} columnIndex={2} width={cellWidth} state={_ticToeGameService.getCellState(0, 2)} onClick={cellClickHandler} />
		</div>
		<div className="cells-row">
			<TicToeCell rowIndex={1} columnIndex={0} width={cellWidth} state={_ticToeGameService.getCellState(1, 0)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={1} columnIndex={1} width={cellWidth} state={_ticToeGameService.getCellState(1, 1)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={1} columnIndex={2} width={cellWidth} state={_ticToeGameService.getCellState(1, 2)} onClick={cellClickHandler} />
		</div>
		<div className="cells-row">
			<TicToeCell rowIndex={2} columnIndex={0} width={cellWidth} state={_ticToeGameService.getCellState(2, 0)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={2} columnIndex={1} width={cellWidth} state={_ticToeGameService.getCellState(2, 1)} onClick={cellClickHandler} />
			<TicToeCell rowIndex={2} columnIndex={2} width={cellWidth} state={_ticToeGameService.getCellState(2, 2)} onClick={cellClickHandler} />
		</div>
	</>);
};

export default TicToeBoard;
