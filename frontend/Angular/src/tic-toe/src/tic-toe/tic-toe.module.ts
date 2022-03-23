import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TicToeComponent } from './tic-toe.component';
import { TicToeCellComponent } from './tic-toe-cell/tic-toe-cell.component';
import { TicToeBoardComponent } from './tic-toe-board/tic-toe-board.component';
import { TicToeDisplayComponent } from './tic-toe-display/tic-toe-display.component';
import { TicToeGameService } from 'src/services/tic-toe.service';
import { TicToeCellSate } from 'src/models/ticToe.model';

/** TicToeGameService */
const ticToeGameServiceFactory = () => {
	return new TicToeGameService(
		[
			[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
			[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty],
			[TicToeCellSate.Empty, TicToeCellSate.Empty, TicToeCellSate.Empty]
		]
	);
};
const ticToeGameServiceProvider = {
	provide		: TicToeGameService,
	useFactory	: ticToeGameServiceFactory
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
		ticToeGameServiceProvider
	],
	bootstrap: [TicToeComponent]
})
export class TicToeModule { }
