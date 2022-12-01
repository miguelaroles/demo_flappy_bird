import baseImage from "../sprites/base.png";
import { GAME_WIDTH } from "../utils/constants";

const Base = ()=>{
    const baseStyles = {
        position: "absolute",
        height: "83px",
        width: `calc(${GAME_WIDTH}px + 100px)`,
        bottom: "0px",
        backgroundImage: `url(${baseImage})`,
        backgroundRepeat: "repeat",
        zIndex: 10,
    };
    return(<div
        style={baseStyles}
        className="base"
    ></div>);
};

export default Base;
