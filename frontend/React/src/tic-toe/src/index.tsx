import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TicToe from './components/TicToe/TicToe';
import Configuration from './components/Configuration/Configuration';

import './index.scss';

const App = () => {
	const onPlayerNameChangeHandler = (playerXName: string, playerOName: string): void => {
		console.log("onPlayerNameChangeHandler", playerXName, playerOName);

	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<TicToe />} />
				<Route path="configuration" element={
					<Configuration
						onPlayerNameChange={onPlayerNameChangeHandler}
					/>
				} />
			</Routes>
		</BrowserRouter>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
