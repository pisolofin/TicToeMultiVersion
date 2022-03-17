import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TicToeComponent } from './tic-toe.component';
import { TicToeCellComponent } from './tic-toe-cell/tic-toe-cell.component';
import { TicToeBoardComponent } from './tic-toe-board/tic-toe-board.component';

@NgModule({
	declarations: [
		TicToeComponent,
		TicToeCellComponent,
		TicToeBoardComponent
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [TicToeComponent]
})
export class TicToeModule { }
