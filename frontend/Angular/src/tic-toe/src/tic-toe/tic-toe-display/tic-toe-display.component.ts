import { Component } from '@angular/core';
import { TicToeGameService } from '../../services/tic-toe.service';
import { PlayerToPlay } from '../../../../../../shared/models/ticToe.model';

@Component({
	selector: 'tic-toe-display',
	templateUrl: './tic-toe-display.component.html',
	styleUrls: ['./tic-toe-display.component.scss']
})
export class TicToeDisplayComponent {
	/** Service for the game */
	public ticToeGameService: TicToeGameService;

	constructor(ticToeGameService: TicToeGameService) {
		this.ticToeGameService = ticToeGameService;
	}

	/** Return the name of the player */
	public playerToName(player: PlayerToPlay | null): string {
		switch (player) {
			case PlayerToPlay.PlayerX:
				return "X";
			case PlayerToPlay.PlayerO:
				return "O";
			default:
				return "";
		}
	}
}
