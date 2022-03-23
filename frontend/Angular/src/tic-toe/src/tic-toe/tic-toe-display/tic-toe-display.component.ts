import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerToPlay } from 'src/models/ticToe.model';
import { TicToeGameService } from 'src/services/tic-toe.service';

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
