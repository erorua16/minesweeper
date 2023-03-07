import { normalize } from "path";
import React from "react";
import Grid from "./Grid";
import { Difficulty, DifficultyContextType } from "../types/difficulty";
import Timer from "./Timer";
import { GameState } from "../types/gameState";
import GameEndModal from "./GameEndModal";

const Board = ({DifficultyContext}:any) : React.ReactElement => {
  const {difficulty, setDifficulty} = React.useContext<DifficultyContextType>(DifficultyContext)
  const [gameState , setGameState] = React.useState<GameState>(GameState.notPlaying)

  const handleDifficultyChange = (event:any) => {
    const value = event.target.value
    if (value === Difficulty.easy) {
      setDifficulty(Difficulty.easy)
      setGameState(GameState.notPlaying)
    } else if (value === Difficulty.normal) {
      setDifficulty(Difficulty.normal);
      setGameState(GameState.notPlaying)
    } else if (value === Difficulty.medium) {
      setDifficulty(Difficulty.medium);
      setGameState(GameState.notPlaying)
    } else if (value === Difficulty.hard) {
      setDifficulty(Difficulty.hard);
      setGameState(GameState.notPlaying)
    } else {
      setDifficulty(Difficulty.default);
      setGameState(GameState.notPlaying)
    }
  };

  const startGame = () => {
    if(difficulty){
      setGameState(GameState.playing)
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
          {gameState !== GameState.notPlaying ? <Timer gameState={gameState}/> : null}
        </div>
        <div>
          <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">LeaderBoard</button>
        </div>
      </div>
      {difficulty && gameState !== GameState.notPlaying ? <Grid difficulty={difficulty} gameState={gameState} setGameState={setGameState} /> : null}
      {gameState === GameState.lose || gameState === GameState.win ? <GameEndModal gameState={gameState}/> : null}
    </div>
  </>
};

export default Board;
