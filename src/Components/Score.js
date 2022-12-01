import { v4 as uuidv4 } from 'uuid';
import num0 from "../sprites/0.png";
import num1 from "../sprites/1.png";
import num2 from "../sprites/2.png";
import num3 from "../sprites/3.png";
import num4 from "../sprites/4.png";
import num5 from "../sprites/5.png";
import num6 from "../sprites/6.png";
import num7 from "../sprites/7.png";
import num8 from "../sprites/8.png";
import num9 from "../sprites/9.png";

const numberArray = [
    num0,
    num1,
    num2,
    num3,
    num4,
    num5,
    num6,
    num7,
    num8,
    num9,
];

const Score = (props) => {
    const {score} = props;
    const scoreLettersArray = `${score}`.split("");

    return(
        <div className="score">
            <div className="score-title"></div>
            {scoreLettersArray.map((letter) => {
                return <img
                    key={uuidv4()}
                    src={numberArray[Number(letter)]}
                    alt="flappy bird"
                    className="number"
                />
            })}
        </div>
    );
};

export default Score;