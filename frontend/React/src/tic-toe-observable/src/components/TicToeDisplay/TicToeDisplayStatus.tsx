import { useObservableState } from 'observable-hooks';
import React, { useContext } from 'react';
import { TicToeGameObservableService, TicToeGameObservableServiceContext } from '../../services/tic-toe-observable.service';

const TicToeDisplayStatus: React.FC = () => {
	/** Service for the game */
	const _ticToeGameService: TicToeGameObservableService = useContext(TicToeGameObservableServiceContext);

	/** Active state of the game */
	const isGameActive	: boolean | undefined = useObservableState(_ticToeGameService.isGameActive$);

	console.info("TicToeDisplayStatus render")

	return (<>
		Game state: {isGameActive ? "active" : "not active"}
	</>);
};

export default TicToeDisplayStatus;
