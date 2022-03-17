import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TicToeCellSate } from '../../models/ticToe.model';

/** Data of onClick event */
export interface TicToeCellOnClick {
	rowIndex	: number;
	columnIndex	: number;
}

@Component({
	selector: 'tic-toe-cell',
	templateUrl: './tic-toe-cell.component.html',
	styleUrls: ['./tic-toe-cell.component.scss']
})
export class TicToeCellComponent implements OnInit {
	/** Size of cell, default value is 20px */
	@Input() public cellWidth: number = 20;

	/** Row index, value must be passed */
	@Input() public rowIndex!: number;
	/** Column index, value must be passed */
	@Input() public columnIndex!: number;
	/** State of the cell, default state is Empty */
	@Input() public cellState: TicToeCellSate = TicToeCellSate.Empty;

	/** On user click on button event */
	@Output() public cellClick: EventEmitter<TicToeCellOnClick> = new EventEmitter<TicToeCellOnClick>();

	constructor() { }

	ngOnInit(): void {

	}

	ngAfterViewInit(): void {
		console.log(`ngAfterViewInit ${this.rowIndex} - ${this.columnIndex}`);
	}

	/** Handle click on the button */
	public onClickHandler(): void {
		this.cellClick.emit(<TicToeCellOnClick> {
			rowIndex	: this.rowIndex,
			columnIndex	: this.columnIndex
		});
	}

	/** Render cell state */
	public renderCellState(): string {
		switch (this.cellState) {
			case TicToeCellSate.Empty:
			default:
				return ' ';
			case TicToeCellSate.X:
				return 'X';
			case TicToeCellSate.O:
				return 'O';
		}
	};
}
