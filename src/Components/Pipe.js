import pipeImage from "../sprites/pipe-green.png";

const Pipe = (props)=>{
    const { top,width,height,rotate,left } = props;
    const birdStyles = {
        position: "absolute",
        height: `${height}px`,
        width: `${width}px`,
        top: `${top}px`,
        left: `${left}px`,
        backgroundImage: `url(${pipeImage})`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        zIndex: rotate === 180 ? 3 : 4,
        transform: `rotate(${rotate}deg)`,
    };
    return(<div style={birdStyles} className="pipe"></div>);
}

export default Pipe;