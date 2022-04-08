import React, { MouseEvent } from 'react';
import { TicToeCellSate } from '../../shared/models/ticToe.model';

/** TicToc cell's click handler */
export type TicToeCellClickHandler = (rowIndex: number, columnIndex: number) => void;

interface TicToeCellProps {
	columnIndex	: number;
	rowIndex	: number;
	width?		: number;
	state		: TicToeCellSate;
	onClick?	: TicToeCellClickHandler; 
}

const TicToeCell: React.FC<TicToeCellProps> = (props: TicToeCellProps) => {
	/** Render cell state */
	const renderCellState = (): string => {
		switch (props.state) {
			case TicToeCellSate.Empty:
			default:
				return ' ';
			case TicToeCellSate.X:
				return 'X';
			case TicToeCellSate.O:
				return 'O';
		}
	};

	/** Cell click handler */
	const clickHandler = (event: MouseEvent<HTMLButtonElement>): void => {
		props.onClick?.(props.rowIndex, props.columnIndex);
	};

	// Cell style for props' values
	const cellStyle = {
		width			: `${props.width || 20}px`,
		height			: `${props.width || 20}px`,
		verticalAlign	: "top"
	};

	return (
		<button style={cellStyle} onClick={clickHandler} title="ciao">
			{renderCellState()}
		</button>
	);
}

export default TicToeCell;
