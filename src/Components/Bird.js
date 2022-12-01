import birdImage from "../sprites/redbird-midflap.png";

const Bird = (props)=>{
    const { size,position } = props;
    const birdStyles = {
        position: "absolute",
        height: `${size}px`,
        width: `${size}px`,
        top: `${position}px`,
        borderRadius: "50%",
        backgroundImage: `url(${birdImage})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        zIndex: 3,
    };
    return(<div style={birdStyles} className="bird"></div>);
};

export default Bird;