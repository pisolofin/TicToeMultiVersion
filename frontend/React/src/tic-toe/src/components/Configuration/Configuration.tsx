import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Configuration.scss';

interface ConfigurationProps {
	onPlayerNameChange: (playerXName: string, playerOName: string) => void;
}

const Configuration: React.FC<ConfigurationProps> = (props: ConfigurationProps) => {
	/** Reference of input for the name of player X */
	const playerXRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
	/** Reference of input for the name of player O */
	const playerORef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

	useEffect(() => {
		return () => {
			console.log("End");
			props.onPlayerNameChange(/* playerXName */playerXRef.current!.value, /* playerOName */playerORef.current!.value);
		};
	}, []);

	return (<>
		<div className="other-container">
			<h4 className="title">Configuration page</h4>
			<table>
				<tbody>
					<tr>
						<td>Player X</td>
						<td><input ref={playerXRef} type="text" title="Name of player X" /></td>
					</tr>
					<tr>
						<td>Player O</td>
						<td><input ref={playerORef} type="text" title="Name of player O" /></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div className="other-container">
			<Link to="/">Back to game</Link>
		</div>
	</>);
};

export default Configuration;
