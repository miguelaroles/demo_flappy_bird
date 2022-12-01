import backgroundImage from "../sprites/background.gif";
import messageImage from "../sprites/message.png";

const GameScreen = ()=>{
    const baseStyles = {
        backgroundImage: `url(${backgroundImage})`,
    };
    return(
        <div
            className="game-over"
            style={baseStyles}
        >
            <img src={messageImage} alt="game-opening" />
        </div>
    );
};

export default GameScreen;