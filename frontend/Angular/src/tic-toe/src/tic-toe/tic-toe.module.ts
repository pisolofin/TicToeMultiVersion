import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TicToeComponent } from './tic-toe.component';
import { TicToeCellComponent } from './tic-toe-cell/tic-toe-cell.component';
import { TicToeBoardComponent } from './tic-toe-board/tic-toe-board.component';
import { TicToeDisplayComponent } from './tic-toe-display/tic-toe-display.component';
import { TicToeGameService } from '../services/tic-toe.service';
import { TicToeCellSate } from '../../../../../shared/models/ticToe.model';
import { TicToeGameUtility } from '../../../../../shared/services/tic-toe-game.utility';

/** TicToeGameService */
const ticToeGameServiceFactory = (gameUtility: TicToeGameUtility) => {
	return new TicToeGameService(
		[
			[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
			[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
			[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty]
		],
		gameUtility
	);
};
const ticToeGameServiceProvider = {
	provide		: TicToeGameService,
	useFactory	: ticToeGameServiceFactory,
	deps		: [TicToeGameUtility]
};

@NgModule({
	declarations: [
		TicToeComponent,
		TicToeCellComponent,
		TicToeBoardComponent,
		TicToeDisplayComponent
	],
	imports: [
		BrowserModule
	],
	providers: [
		TicToeGameUtility,
		ticToeGameServiceProvider
	],
	bootstrap: [TicToeComponent]
})
export class TicToeModule { }
