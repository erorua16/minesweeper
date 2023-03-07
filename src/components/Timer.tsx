import React from 'react';
import { GameState } from '../types/gameState';
interface TimerType {
  gameState: GameState;
}
const Timer = ({gameState}:TimerType) => {
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const gameStateRef = React.useRef(gameState);

  React.useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (gameStateRef.current !== GameState.win && gameStateRef.current !== GameState.lose) {
        setSeconds(seconds => seconds + 1);
        if (seconds === 59) {
          setMinutes(minutes => minutes + 1);
          setSeconds(0);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return <>
    <div className="w-24 mx-1 p-2 bg-white text-indigo-700 rounded-lg">
        <div className="font-mono leading-none" x-text="minutes">{minutes}</div>
        <div className="font-mono uppercase text-sm leading-none">Minutes</div>
    </div>

    <div className="w-24 mx-1 p-2 bg-white text-indigo-700 rounded-lg">
        <div className="font-mono leading-none" x-text="seconds">{seconds}</div>
        <div className="font-mono uppercase text-sm leading-none">Seconds</div>
    </div>
  </>
};

export default Timer;