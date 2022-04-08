import { useSelector } from "react-redux";
import * as GameSelectors from '../../redux/game.selectors';

const TicToeDisplayStatus: React.FC = () => {
	/** Active state of the game */
	const isGameActive	: boolean = useSelector(GameSelectors.selectIsGameActive);

	console.info("TicToeDisplayStatus render")

	return (<>
		Game state: {isGameActive ? "active" : "not active"}
	</>);
};

export default TicToeDisplayStatus;
