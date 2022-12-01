import backgroundImage from "../sprites/background.gif";
import gameOverImage from "../sprites/gameover.png";

const GameOverScreen = (props) => {
    const {callback} = props;

    return(<div
        style={{
            backgroundImage: `url(${backgroundImage})`,
        }}
        className="game-over"
        onClick={callback}
    >
        <img src={gameOverImage} alt="game-over" />
    </div>);
};

export default GameOverScreen;