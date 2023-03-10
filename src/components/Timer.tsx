import React from 'react';
import { GameState } from '../types/gameState';
interface TimerType {
  gameState: GameState;
  finalTime?: (a: number, b: number) => void;
}

const Timer = ({ finalTime,gameState}:TimerType) => {
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (gameState !== GameState.win && gameState !== GameState.lose) {
        setSeconds(seconds => seconds + 1);
        if (seconds === 59) {
          setMinutes(minutes => minutes + 1);
          setSeconds(0);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [minutes, seconds]);

  React.useEffect(()=> {
    if (finalTime) finalTime(seconds, minutes);
    if(gameState === GameState.win || gameState === GameState.lose){
      setMinutes(0)
      setSeconds(0)
    }
  }, [gameState])

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

