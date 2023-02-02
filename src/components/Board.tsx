import { normalize } from "path";
import React from "react";
import Grid from "./Grid";
import { Difficulty } from "../types/difficulty";
import Timer from "./Timer";
import WinModal from "./WinModal";

const Board = () => {

  const [difficulty, setDifficulty] = React.useState<Difficulty>()

  //@TODO
  //Make gamestate a context
  const [gameState , setGameState] = React.useState<boolean>(false)

  const handleDifficultyChange = (event:any) => {
    const value = event.target.value
    if (value === Difficulty.easy) {
      setDifficulty(Difficulty.easy)
      setGameState(false)
    } else if (value === Difficulty.normal) {
      setDifficulty(Difficulty.normal);
      setGameState(false)
    } else if (value === Difficulty.medium) {
      setDifficulty(Difficulty.medium);
      setGameState(false)
    } else if (value === Difficulty.hard) {
      setDifficulty(Difficulty.hard);
      setGameState(false)
    } else {
      setDifficulty(Difficulty.default);
      setGameState(false)
    }
  };

  const startGame = () => {
    if(difficulty){
      setGameState(true)
    }
  }
  
  return <>
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex items-center">
          <select value={difficulty} onChange={handleDifficultyChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5">
            <option value={Difficulty.default}></option>
            <option value={Difficulty.easy}>Easy (9x9, 10 bombs)</option>
            <option value={Difficulty.normal}>Normal (16x16, 40 bombs)</option>
            <option value={Difficulty.medium}>Medium (22x22, 100 bombs)</option>
            <option value={Difficulty.hard}>Hard (30x30, 250 bombs)</option>
          </select>
          <button onClick={() => {startGame()}} className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">Start Game</button>
          {gameState ? <Timer/> : null}
        </div>
        <div>
          <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">LeaderBoard</button>
        </div>
      </div>
      {difficulty && gameState ? <Grid difficulty={difficulty} /> : null}
      {/* <WinModal gameState={gameState}></WinModal> */}
    </div>
  </>
};

export default Board;
