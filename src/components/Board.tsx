import { normalize } from "path";
import React from "react";
import Grid from "./Grid";
import { Difficulty } from "../types/difficulty";
import Timer from "./Timer";

const Board = () => {

  const [difficulty, setDifficulty] = React.useState<Difficulty>()
  const [gameState , setGameState] = React.useState<boolean>(false)

  const handleDifficultyChange = (event:any) => {
    const value = event.target.value
    if (value === Difficulty.easy) {
      setDifficulty(Difficulty.easy)
    } else if (value === Difficulty.normal) {
      setDifficulty(Difficulty.normal);
    } else if (value === Difficulty.medium) {
      setDifficulty(Difficulty.medium);
    } else if (value === Difficulty.hard) {
      setDifficulty(Difficulty.hard);
    } else {
      setDifficulty(Difficulty.default);
    }
  };

  const startGame = () => {
    if(difficulty){
      setGameState(true)
    }
  }
  
  return <>
    <div className="flex flex-col">
      <div className="flex items-center">
        <select value={difficulty} onChange={handleDifficultyChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5">
          <option value={Difficulty.default}></option>
          <option value={Difficulty.easy}>Easy</option>
          <option value={Difficulty.normal}>Normal</option>
          <option value={Difficulty.medium}>Medium</option>
          <option value={Difficulty.hard}>Hard</option>
        </select>
        <button onClick={() => {startGame()}} className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">Start Game</button>
        {gameState ? <Timer/> : null}
      </div>
      {difficulty && gameState ? <Grid difficulty={difficulty} /> : null}
    </div>;
  </>
};

export default Board;
