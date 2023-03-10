import React from 'react';
import { GameState } from '../types/gameState';
interface TimerType {
  gameState: GameState;
  finalTime?: (a: number, b: number) => void;
}

const Timer = ({ finalTime, gameState }: TimerType) => {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === GameState.playing) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  React.useEffect(() => {
    if (finalTime) finalTime(Math.floor(time / 60), time % 60);
  }, [finalTime, time]);

  React.useEffect(() => {
    if (gameState === GameState.win || gameState === GameState.lose) {
      setTime(0);
    }
  }, [gameState]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <>
      <div className="w-24 mx-1 p-2 bg-white text-indigo-700 rounded-lg">
        <div className="font-mono leading-none">{minutes}</div>
        <div className="font-mono uppercase text-sm leading-none">Minutes</div>
      </div>

      <div className="w-24 mx-1 p-2 bg-white text-indigo-700 rounded-lg">
        <div className="font-mono leading-none">{seconds}</div>
        <div className="font-mono uppercase text-sm leading-none">Seconds</div>
      </div>
    </>
  );
};

export default Timer;
