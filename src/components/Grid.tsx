import React from "react";
import { Difficulty } from "../types/difficulty";

interface GridType {
    size : number;
    numBombs : number;
}

const Grid : React.FC<{ difficulty: Difficulty }> = (props: { difficulty: Difficulty })  => {
    const [gridSize, setGridSize] = React.useState<number | null>();
    const [numBombs, setNumBombs] = React.useState<number | null>();
    const [bombsIds, setBombsIds] = React.useState<string[]>([])


    React.useEffect(() => {
        setGridState()
    }, [props.difficulty])

    React.useEffect(() => {
        setBombs()
    },[gridSize,numBombs])
    
    const setGridState = () => {
        switch (props.difficulty) {
          case Difficulty.easy:
            setGridSize(9);
            setNumBombs(10);
            break;
          case Difficulty.normal:
            setGridSize(16);
            setNumBombs(40);
            break;
          case Difficulty.medium:
            setGridSize(22);
            setNumBombs(100);
            break;
          case Difficulty.hard:
            setGridSize(30);
            setNumBombs(250);
            break;
          default:
            setGridSize(0);
            setNumBombs(0);
            break;
        }
      }

      const setBombs = () => {
       if(gridSize && numBombs){
        let numBombsPlaced = 0;
        let bombCellIds: string[] = [];
        while(numBombsPlaced < numBombs){
            let randomRow = Math.floor(Math.random() * gridSize);
            let randomCol = Math.floor(Math.random() * gridSize);
            let cellId = `${randomRow}-${randomCol}`;
            if(!bombCellIds.includes(cellId)){
                bombCellIds.push(cellId);
                numBombsPlaced++;
            }
        }
        setBombsIds(bombCellIds);
       }
      }
      
      const renderGrid = () => {
        let grid = [];
        if(gridSize && numBombs){
            for (let i = 0; i < gridSize; i++) {
                let row = [];
                for (let j = 0; j < gridSize; j++) {
                    let cellId = `${i}-${j}`;
                    if(bombsIds.includes(cellId)){
                        row.push(<div key={`${i}-${j}`} className="grid-cell flex flex-col h-10 w-10 border border-gray-400 rounded-md justify-center items-center"><i className="fa-solid fa-bomb"></i></div>);
                    } else {
                        row.push(<div key={`${i}-${j}`} className="grid-cell flex flex-col h-10 w-10 border border-gray-400 rounded-md justify-center items-center"></div>);
                    }
                }
                grid.push(<div key={i} className="grid-row flex flex-row[p">{row}</div>)
            }
            
            return grid;
        }
    };
      return <div className="grid">
        {renderGrid()}
    </div>
}

export default Grid