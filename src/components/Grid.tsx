import React from "react";
import { Difficulty } from "../types/difficulty";

interface GridType {
    difficulty: Difficulty;
}

interface cellIds {
    position : string,
    value : string,
    revealed : boolean
}

const Grid : React.FC<GridType> = ({ difficulty } : GridType)  => {

    const [gridSize, setGridSize] = React.useState<number | null>();
    const [numBombs, setNumBombs] = React.useState<number | null>();
    const [cellIds, setCellIds] = React.useState<cellIds[]>([]);

    React.useEffect(() => {
        setGridState()
    }, [difficulty])

    React.useEffect(()=>{
        if(gridSize && numBombs){
            setGrid()
        }
    }, [gridSize])

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

    const handleFlip = (cellId :string) => {
        var cell = cellIds.find(item => item.position === cellId);
        console.log(cellIds)
        if(cell?.revealed){
            return
        }

        if(cell?.value === "bomb"){
            console.log('boom boom')
        }
        setCellIds(cellIds =>
            cellIds.map(cell => {
                if (cell.position === cellId) {
                return { ...cell, revealed: true };
                }
                return cell;
            })
        );
    }

    const setBombs = () => {
        if (gridSize && numBombs) {
            let numBombsPlaced = 0;
            let bombCellIds: string[] = [];
        
            while (numBombsPlaced < numBombs) {
            let randomRow = Math.floor(Math.random() * gridSize);
            let randomCol = Math.floor(Math.random() * gridSize);
            let cellId = `${randomRow}-${randomCol}`;
            if (!bombCellIds.includes(cellId)) {
                bombCellIds.push(cellId);
                numBombsPlaced++;
            }
            }
            return bombCellIds;
        }
    }

    const setGrid = () => {
        if(gridSize && numBombs){
            let cellIds = [];
            let bombCellIds = setBombs();
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    let cellId = `${i}-${j}`;
                    let count = 0
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                          if (bombCellIds!.includes(`${i + x}-${j + y}`)) count++;
                        }
                    }
                    if(bombCellIds!.includes(cellId)){
                        cellIds.push({position : cellId, value: "bomb", revealed : false});
                    }else{
                        cellIds.push({position : cellId, value: `${count}`, revealed : false});
                    }
                    
                }
            }
            setCellIds(cellIds);
        }
    }
      
    const renderGrid = () => {
        let grid = [];
        const cellClassColor = " bg-indigo-700"
        var cellClassEmpty = "grid-cell flex flex-col h-10 w-10 border border-gray-400 rounded-md justify-center items-center"
        if(gridSize && numBombs){
            for(let i = 0; i < cellIds.length; i ++){
                let row = []
                for(let j = 0 ; j < cellIds.length; j++){
                    let cellId = `${i}-${j}`;
                    var cell = cellIds.find(item => item.position === cellId);
                    if(cell && cell.position){
                        if(cell.value === "bomb"){
                            row.push(<div key={cell.position} className={cell.revealed ? cellClassEmpty : cellClassEmpty + cellClassColor} onClick={() => handleFlip(cellId)}>{cell.revealed ? <i className="fa-solid fa-bomb"></i> : null}</div>);
                        } else {
                            row.push(<div key={cell.position} className={cell.revealed ? cellClassEmpty : cellClassEmpty + cellClassColor} onClick={() => handleFlip(cellId)}>{parseInt(cell.value) > 0 && cell.revealed ? cell.value : null}</div>);
                        }
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