import React, { useContext, useEffect, useRef, useState } from 'react';
import './App.css';

/*
function Counter(props: {initialCount: number}) {
	const [count, setCount] = useState(props.initialCount);

	console.log("render");
	console.log("count: " + count);
	console.log("props.initialCount: " + props.initialCount);

	return (
	<>
		Count: {count}
		<button onClick={() => setCount(props.initialCount)}>Reset</button>
		<button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
		<button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
	</>
	);
}

function App() {
	return (<>
		<Counter initialCount={0} />
	</>);
}

export default App;
*/

const Stopwatch = () => {
	const timerIdRef = useRef(0);
	const [count, setCount] = useState(0);
	const valueRef = useRef(1);

	const startHandler = () => {
		if (timerIdRef.current) { return; }
		timerIdRef.current = setInterval(() => setCount(c => c+1), 1000) as any;
	};

	const stopHandler = () => {
		clearInterval(timerIdRef.current);
		timerIdRef.current = 0;
	};

	console.log("Stopwatch render");

	useEffect(() => {
		console.log("Stopwatch useEffect only first");
		return () => clearInterval(timerIdRef.current);
	}, []);

	useEffect(() => {
		console.log("Stopwatch useEffect every time");
	});

	return (
		<div>
			<div>Timer: {count}s</div>
			<div>
			<button onClick={startHandler}>Start</button>
			<button onClick={stopHandler}>Stop</button>
			</div>
			{ console.log(valueRef.current) }
		</div>
	);
}

const themes = {
	light: {
		foreground: "#000000",
		background: "#eeeeee"
	},
	dark: {
		foreground: "#ffffff",
		background: "#222222"
	}
};

const ThemeContext = React.createContext(themes.light);

function Toolbar() {
	return (
	<div>
		<ThemedButton />
	</div>
	);
}
  
function ThemedButton() {
	const theme = useContext(ThemeContext);
	return (
		<button style={{ background: theme.background, color: theme.foreground }}>
			I am styled by theme context!
		</button>
	);
}

const App = () => {
	const [inputValue, setInputValue] = useState("");
	const count = useRef(0);
	let countNoRef = 0;

	console.log("render App");
	console.log("count: " + count.current);
	console.log("countNoRef: " + countNoRef);

	useEffect(() => {
		count.current = count.current + 1;
		countNoRef = countNoRef + 1;
	});

	return (
		<>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<h1>Render Count: {count.current}</h1>
			<h1>Render Count noRef: {countNoRef}</h1>

			<hr />

			<Stopwatch />

			<hr />

			<ThemeContext.Provider value={themes.dark}>
				<Toolbar />
			</ThemeContext.Provider>

			<hr />

			<Toolbar />
		</>
	);
}

export default App;
