import Grid from "@mui/material/Grid";
import { useAuth } from "../../Hooks/FirebaseHooks";
import { useCallback, useEffect, useState } from "react";
import {
    addDoc,
    collection,
    limit,
    onSnapshot,
    orderBy,
    query
} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import Score from "../../Components/Score";
import GameOverScreen from "../../Components/GameOverScreen";
import Bird from "../../Components/Bird";
import Pipe from "../../Components/Pipe";
import Base from "../../Components/Base";
import GameScreen from "../../Components/GameScreen";
import {
    BIRD_SIZE,
    GAME_HEIGHT,
    GAME_WIDTH,
    GRAVITY,
    LIFT,
    BASE,
    PIPE_WIDTH,
    PIPE_GAP,
    PIPE_HEIGHT,
    PIPE_VELOCITY
} from "../../utils/constants";
import "./game.css";

const GameWrapper = () => {
    const [itemPosition,setItemPosition] = useState(100);
    const [start,setStart] = useState(false);
    const [gameOver,setGameOver] = useState(false);
    const [pipeHeight,setPipeHeight] = useState(200);
    const [pipeLeft,setPipeLeft] = useState(GAME_WIDTH - PIPE_WIDTH);
    const [bottomPipeHeight,setBottomPipeHeight] = useState(GAME_HEIGHT - PIPE_GAP - pipeHeight);
    const [score,setScore] = useState(0);
    const [gameHighScore,setGameHighScore] = useState(0);
    const database_helper = useAuth();
    const db = database_helper.db;

    useEffect(()=>{
        let intervalId;
        if(start && (itemPosition < (GAME_HEIGHT - BIRD_SIZE - BASE))){
            intervalId = setInterval(()=>{
                setItemPosition(itemPosition => itemPosition + GRAVITY);
            },24);
        }
        return(()=>{
            clearInterval(intervalId);
        });
    },[itemPosition,start]);

    useEffect(()=>{
        let intervalPipe;
        if(start && pipeLeft >= -PIPE_WIDTH){
            intervalPipe = setInterval(() => {
               setPipeLeft((pipeLeft) => pipeLeft - PIPE_VELOCITY);
            },24);

            return(()=>{
                clearInterval(intervalPipe);
            });
        } else {
            const newPipeHeight = Math.floor(Math.random() * (PIPE_HEIGHT - PIPE_GAP));
            setPipeLeft(GAME_WIDTH - PIPE_WIDTH);
            setPipeHeight(newPipeHeight);
            setBottomPipeHeight(newPipeHeight + PIPE_GAP)
            setScore(score => score + 1);
        }
    },[start,pipeLeft]);

    const toggleGameOverScreen = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        setGameOver(gameOver => !gameOver);
    },[]);

    const createScore = useCallback(async () => {
        return await addDoc(
            collection(db, "scores"), {
                score,
                user_id: uuidv4(),
            });
    },[db,score]);

    useEffect(()=>{
        const q = query(collection(db, "scores"), orderBy("score","desc"), limit(1));
        const unsubscribeMaximum = onSnapshot(q,(snapshot) => {
            const highScore = []
            snapshot.forEach((doc) => {
                highScore.push(doc.data().score);
            });
            setGameHighScore(highScore[0]);
        });

        return(()=>{
            unsubscribeMaximum();
        })
    },[db]);

    useEffect(() => {
        const hasCollideWithTopPipe = (itemPosition > 0) && (itemPosition < pipeHeight);
        const hasCollideWithBottomPipe = (itemPosition > 0) && (itemPosition >= (GAME_HEIGHT - bottomPipeHeight));

        if((pipeLeft > 0) && (pipeLeft <= PIPE_WIDTH) && (hasCollideWithBottomPipe || hasCollideWithTopPipe)) {
            setStart(false);
            setGameOver(true);
            setItemPosition(100);
            createScore().then((scoreRef)=>{
                //console.log(" id score ", scoreRef.id);
            });
        }
    },[itemPosition,pipeHeight,bottomPipeHeight,pipeLeft,createScore]);

    const handleClick = () => {
        const newPosition = itemPosition - LIFT;
        if(!start){
            setStart(true);
            setScore(0);
        } else if(newPosition > 0){
            setItemPosition(newPosition);
        } else {
            setItemPosition(0);
        }
    };

    const containerStyle = {
        height: `${GAME_HEIGHT}px`,
        width: `${GAME_WIDTH}px`,
        maxWidth: `${GAME_WIDTH}px`,
    };

    return(<Grid
        container
        spacing={0}
        className="game-wrapper"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
    >
        <Grid
            onClick={handleClick}
            style={containerStyle}
            className="game-container"
            xs={12} md={4} lg={3} item>
            {start ? (<Pipe
                rotate={180}
                top={0}
                width={PIPE_WIDTH}
                height={pipeHeight}
                left={pipeLeft}
            />) : null}
            {start ? <Bird size={BIRD_SIZE} position={itemPosition}/> : null}
            {!start && !gameOver ? <GameScreen /> : null}
            {start ? (<Pipe
                rotate={0}
                top={GAME_HEIGHT - (pipeHeight + PIPE_GAP)}
                width={PIPE_WIDTH}
                height={bottomPipeHeight}
                left={pipeLeft}
            />) : null}
            <Base />
            {start || gameOver ? <Score score={score} /> : null}
            {!start && !gameOver ? <Score score={gameHighScore} /> : null}
            {gameOver ? <GameOverScreen callback={toggleGameOverScreen} /> : null}
        </Grid>
    </Grid>);
};

export default GameWrapper;