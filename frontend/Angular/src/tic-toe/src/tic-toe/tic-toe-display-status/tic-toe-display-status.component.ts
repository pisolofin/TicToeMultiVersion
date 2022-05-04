import { Component } from '@angular/core';
import { TicToeGameService } from '../../services/tic-toe.service';

@Component({
	selector: 'tic-toe-display-status',
	templateUrl: './tic-toe-display-status.component.html',
	styleUrls: ['./tic-toe-display-status.component.scss']
})
export class TicToeDisplayStatusComponent {
	/** Service for the game */
	public ticToeGameService: TicToeGameService;

	constructor(ticToeGameService: TicToeGameService) {
		this.ticToeGameService = ticToeGameService;
	}
}
