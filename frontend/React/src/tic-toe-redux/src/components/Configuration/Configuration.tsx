import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as GameActions from '../../redux/game.actions';
import * as GameSelectors from '../../redux/game.selectors';

import './Configuration.scss';

interface ConfigurationProps {

}

const Configuration: React.FC<ConfigurationProps> = (props: ConfigurationProps) => {
	/** Name of PlayerX */
	const [playerXName, setPlayerXName] = useState("");
	/** Name of PlayerO */
	const [playerOName, setPlayerOName] = useState("");

	const reduxDispatch = useDispatch();

	/** Name of Player X */
	const playerXNameSelected	: string | null = useSelector(GameSelectors.selectPlayerXName);
	/** Name of Player O */
	const playerONameSelected	: string | null = useSelector(GameSelectors.selectPlayerOName);

	/** Name of players change */
	useEffect(() => {
		setPlayerXName(playerXNameSelected || "");
		setPlayerOName(playerONameSelected || "");
	}, [playerXNameSelected, playerONameSelected]);

	/** Handler of back button click */
	const onBackClickHandler = () => {
		reduxDispatch(GameActions.setPlayerXName(playerXName));
		reduxDispatch(GameActions.setPlayerOName(playerOName));
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
