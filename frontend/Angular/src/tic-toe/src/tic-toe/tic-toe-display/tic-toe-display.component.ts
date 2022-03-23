import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerToPlay } from 'src/models/ticToe.model';
import { TicToeGameService } from 'src/services/tic-toe.service';

@Component({
	selector: 'tic-toe-display',
	templateUrl: './tic-toe-display.component.html',
	styleUrls: ['./tic-toe-display.component.scss']
})
export class TicToeDisplayComponent implements OnInit, OnDestroy {
	private _subscriptionList: Array<Subscription> = [];

	/** Service for the game */
	public ticToeGameService: TicToeGameService;

	constructor(ticToeGameService: TicToeGameService) {
		this.ticToeGameService = ticToeGameService;
	}

	ngOnInit(): void {
		// Register active game state change
		this._subscriptionList.push(
			this.ticToeGameService.isGameActive$.subscribe(() => {
				console.log("TicToeBoardComponent isGameActive$");
			})
		);
		this._subscriptionList.push(
			this.ticToeGameService.playerWon$.subscribe((whoWon) => {
				console.log("TicToeBoardComponent playerWon$ " + whoWon);
			})
		);
	}

	ngOnDestroy(): void {
		this._subscriptionList.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
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
