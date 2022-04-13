import React from 'react';
import { PlayerToPlay } from '../../shared/models/ticToe.model';

interface TicToeDisplayStatusProps {
	isGameActive: boolean
}

const TicToeDisplayStatus: React.FC<TicToeDisplayStatusProps> = (props: TicToeDisplayStatusProps) => {
	console.info("TicToeDisplayStatus render")

	return (<>
		Game state: {props.isGameActive ? "active" : "not active"}
	</>);
};

export default TicToeDisplayStatus;
