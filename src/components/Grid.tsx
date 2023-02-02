import React from "react";
import { Difficulty } from "../types/difficulty";

interface GridType {
    difficulty: Difficulty;
}

const Grid : React.FC<GridType> = ({ difficulty } : GridType)  => {

    const [gridSize, setGridSize] = React.useState<number | null>();
    const [numBombs, setNumBombs] = React.useState<number | null>();
    const [bombsIds, setBombsIds] = React.useState<string[]>([])
    const [flippedIds, setFlippedIds] = React.useState<{ [key: string]: boolean }>({});

    const handleFLip = (key :string) => {
        setFlippedIds({ ...flippedIds, [key]: true });
    }

    React.useEffect(() => {
        setGridState()
    }, [difficulty])

    React.useEffect(() => {
        setBombs()
    },[gridSize,numBombs])
    
    const setGridState = () => {
        switch (difficulty) {
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
      
      const onClick = (cellId:string) => {
        handleFLip(cellId)
        if (bombsIds.includes(cellId)){
            //@TODO
            //Add  gameover logic
            console.log('boom')
        }
        else{
            //@TODO
            //Add flip grid functions
            console.log('hi')
        }
      }

      const renderGrid = () => {
        let grid = [];
        const cellClassColor = " bg-indigo-700"
        var cellClassEmpty = "grid-cell flex flex-col h-10 w-10 border border-gray-400 rounded-md justify-center items-center"
        if(gridSize && numBombs){
            for (let i = 0; i < gridSize; i++) {
                let row = [];
                for (let j = 0; j < gridSize; j++) {
                    let cellId = `${i}-${j}`;
                    let count = 0;
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            if (bombsIds.includes(`${i + x}-${j + y}`)) count++;
                        }
                    }
                    if(bombsIds.includes(cellId)){
                        row.push(<div key={`${i}-${j}`} className={flippedIds[cellId] ? cellClassEmpty : cellClassEmpty + cellClassColor} onClick={() => onClick(cellId)}>{flippedIds[cellId] ? <i className="fa-solid fa-bomb"></i> : null}</div>);
                    } else {
                        row.push(<div key={`${i}-${j}`} className={flippedIds[cellId] ? cellClassEmpty : cellClassEmpty + cellClassColor} onClick={() => onClick(cellId)}>{count > 0 && flippedIds[cellId]? count : ''}</div>);
                    }
                }
                grid.push(<div key={i} className="grid-row flex flex-row">{row}</div>)
            }
            
            return grid;
        }
    };
      return <>
        {renderGrid()}
    </>
}

export default Grid