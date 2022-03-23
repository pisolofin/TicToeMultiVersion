import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicToeGameService } from '../../services/tic-toe.service';
import { TicToeBoardCells, TicToeCellSate } from '../../models/ticToe.model';
import { TicToeCellOnClick } from '../tic-toe-cell/tic-toe-cell.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'tic-toe-board',
	templateUrl: './tic-toe-board.component.html',
	styleUrls: ['./tic-toe-board.component.scss']
})
export class TicToeBoardComponent implements OnInit, OnDestroy {
	private _unSubscription: Subscription = new Subscription();

	/** Active state of the game */
	private _isGameActive: boolean = true;

	/** Size of cells */
	public cellWidth: number = 30;
	/** Service for the game */
	public ticToeGameService: TicToeGameService;

	constructor(ticToeGameService: TicToeGameService) {
		this.ticToeGameService = ticToeGameService;
	}

	ngOnInit(): void {
		// Register active game state change
		this._unSubscription.add(
			this.ticToeGameService.isGameActive$.subscribe((isGameActive: boolean) => {
				this._isGameActive = isGameActive;
			})
		);
	}

	ngOnDestroy(): void {
		this._unSubscription.unsubscribe();
	}

	/** Handle click on the button */
	public onClickHandler(params: TicToeCellOnClick): void {
		// Check game is active
		if (!this._isGameActive) {
			console.warn("Game not active");
			return ;
		}

		// Check cell can change
		if (!this.ticToeGameService.canCellChange(params.rowIndex, params.columnIndex)) {
			console.warn("Not empty cell");
			return ;
		}

		// Set cell played
		this.ticToeGameService.playerPlayed(
			params.rowIndex,
			params.columnIndex
		);
	}
}
