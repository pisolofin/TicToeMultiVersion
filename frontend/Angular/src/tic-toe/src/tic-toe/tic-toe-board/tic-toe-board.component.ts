import { Component, OnInit } from '@angular/core';
import { TicToeGameService } from '../../services/tic-toe.service';
import { TicToeBoardCells, TicToeCellSate } from '../../models/ticToe.model';
import { TicToeCellOnClick } from '../tic-toe-cell/tic-toe-cell.component';

@Component({
	selector: 'tic-toe-board',
	templateUrl: './tic-toe-board.component.html',
	styleUrls: ['./tic-toe-board.component.scss']
})
export class TicToeBoardComponent implements OnInit {
	/** Size of cells */
	public cellWidth: number = 30;
	/** Service for the game */
	public ticToeGameService: TicToeGameService;

	constructor() {
		// Initialize service for the game
		this.ticToeGameService = new TicToeGameService(
			[
				[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
				[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
				[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty]
			]
		);
	}

	ngOnInit(): void {

	}

	/** Handle click on the button */
	public onClickHandler(params: TicToeCellOnClick): void {
//		if (!isGameActive) {
//			console.warn("Game not active");
//			return ;
//		}

		if (!this.ticToeGameService.canCellChange(params.rowIndex, params.columnIndex)) {
			console.warn("Not empty cell");
			return ;
		}

		this.ticToeGameService.playerPlayed(
			params.rowIndex,
			params.columnIndex
		);
	}
}
