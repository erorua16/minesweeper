import { normalize } from "path";
import React from "react";
import Cell from "./Cell";
import Grid from "./Grid";
import { Difficulty } from "../types/difficulty";

const Board = () => {

 
  // const onClick = (cell:any) => {
  //   // Check if square is flagged
  //   if (cell.isFlagged) {
  //       // Do nothing
  //       return;
  //   }

  //   // Check if square contains a mine
  //   if (cell.isMine) {
  //       // End game
  //       setGameOver(true);
  //   } else {
  //       // Reveal square
  //       setRevealedSquares(revealedSquares + 1);
  //   }
  // };


  // easy : 9x9 cases, 10 bombes
  // normal : 16x16 cases, 40 bombes
  // medium : 22x22 cases, 100 bombes
  // hard : 30x30 cases, 250 bombes


  const [difficulty, setDifficulty] = React.useState<Difficulty>()

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
  
  return <div>
    <select value={difficulty} onChange={handleDifficultyChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5">
      <option value={Difficulty.default}></option>
      <option value={Difficulty.easy}>Easy</option>
      <option value={Difficulty.normal}>Normal</option>
      <option value={Difficulty.medium}>Medium</option>
      <option value={Difficulty.hard}>Hard</option>
    </select>
    {difficulty ? <Grid difficulty={difficulty} /> : null}
</div>;
};

export default Board;
