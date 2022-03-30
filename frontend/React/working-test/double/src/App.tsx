import React, { useState } from 'react';
import './App.css';

const ComponentA = (props: { intValue: number, onValueChange: () => void }) => {
	console.log("ComponentA render");
	return (<>
		<div>ComponentA</div>
		<ComponentAA intValue={props.intValue} onValueChange={props.onValueChange} />
	</>);
}

const ComponentAA = (props: { intValue: number, onValueChange: () => void }) => {
	console.log("ComponentAA render");
	return (<>
		<div>ComponentAA {props.intValue}</div>
		<button onClick={() => props.onValueChange()}>change</button>
	</>);
}

const ComponentB = (props: { intValue: number }) => {
	console.log("ComponentB render");
	return (<>
		<div>ComponentB</div>
		<ComponentBB intValue={props.intValue} />
	</>);
}

const ComponentBB = (props: { intValue: number }) => {
	console.log("ComponentBB render");
	return (<>
		<div>ComponentBB {props.intValue}</div>
	</>);
}

const App: React.FC = () => {
	const [intValueA, setIntValueA] = useState(0)

	const onValueChangeA = () => {
		setIntValueA(intValueA + 1);
	};

	return (<>
		<table>
			<tbody>
				<tr>
					<td>
						<ComponentA intValue={intValueA} onValueChange={onValueChangeA} />
					</td>
					<td>
						<ComponentB intValue={0} />
					</td>
				</tr>
			</tbody>
		</table>
	</>);
}

export default App;
