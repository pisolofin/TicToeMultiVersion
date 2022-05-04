import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import './Configuration.scss';

interface ConfigurationProps {
	/** Name of PlayerX */
	playerXName: string;
	/** Name of PlayerO */
	playerOName: string;
	/** Callback of data changed */
	onPlayerNameChange: (playerXName: string, playerOName: string) => void;
}

const Configuration: React.FC<ConfigurationProps> = (props: ConfigurationProps) => {
	/** Name of PlayerX */
	const [playerXName, setPlayerXName] = useState(props.playerXName);
	/** Name of PlayerO */
	const [playerOName, setPlayerOName] = useState(props.playerOName);

	/** Handler of back button click */
	const onBackClickHandler = () => {
		props.onPlayerNameChange(
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
