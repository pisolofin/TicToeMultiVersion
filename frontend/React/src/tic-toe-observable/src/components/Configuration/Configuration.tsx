import { useObservableState } from 'observable-hooks';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TicToeGameObservableService, TicToeGameObservableServiceContext } from '../../services/tic-toe-observable.service';

import './Configuration.scss';

interface ConfigurationProps {

}

const Configuration: React.FC<ConfigurationProps> = (props: ConfigurationProps) => {
	/** Service for the game */
	const _ticToeGameService: TicToeGameObservableService = useContext(TicToeGameObservableServiceContext);

	/** Name of PlayerX */
	const [playerXName, setPlayerXName] = useState("");
	/** Name of PlayerO */
	const [playerOName, setPlayerOName] = useState("");

	/** Name of Player X */
	const playerXNameObserved	: string | undefined = useObservableState(_ticToeGameService.playerXName$);
	/** Name of Player O */
	const playerONameObserved	: string | undefined = useObservableState(_ticToeGameService.playerOName$);

	useEffect(() => {
		setPlayerXName(playerXNameObserved || "");
		setPlayerOName(playerONameObserved || "");
	}, [playerXNameObserved, playerONameObserved]);

	/** Handler of back button click */
	const onBackClickHandler = () => {
		_ticToeGameService.setPlayersName(
			/* playerXName */playerXName,
			/* playerOName */playerOName
		);
	};

	/** Handler of PlayerX name text change */
	const playerXOnTextChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setPlayerXName(event.target.value);
	};

	/** Handler of PlayerX name text change */
	const playerOOnTextChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setPlayerOName(event.target.value);
	};

	return (<>
		<div className="other-container">
			<h4 className="title">Configuration page</h4>
			<table>
				<tbody>
					<tr>
						<td>Player X</td>
						<td><input type="text" title="Name of player X" value={playerXName} onChange={playerXOnTextChangeHandler} /></td>
					</tr>
					<tr>
						<td>Player O</td>
						<td><input type="text" title="Name of player O" value={playerOName} onChange={playerOOnTextChangeHandler} /></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div className="other-container">
			<Link to="/" onClick={onBackClickHandler}>Back to game</Link>
		</div>
	</>);
};

export default Configuration;
