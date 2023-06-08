import { useSelector } from "react-redux";
import * as GameSelectors from '../../redux/game.selectors';

const TicToeDisplayStatus: React.FC = () => {
	/** Active state of the game */
	const isGameActive	: boolean = useSelector(GameSelectors.selectIsGameActive);
	const asyncStatus	: string  = useSelector(GameSelectors.selectAsyncStatus);

	console.info("TicToeDisplayStatus render")

	return (<>
		<p>
			Game state: {isGameActive ? "active" : "not active"}
		</p>
		<p>
			AsyncStatus {asyncStatus}
		</p>
	</>);
};

export default TicToeDisplayStatus;
