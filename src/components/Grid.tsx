import React from "react";
import { Difficulty } from "../types/difficulty";
import flag from "../flag.png"
import { GameState } from "../types/gameState";

interface GridType {
    difficulty: Difficulty;
    gameState: GameState;
    setGameState:any
}

interface cellIds {
    position : string,
    value : string,
    revealed : boolean,
    flag : boolean

}

const Grid : React.FC<GridType> = ({ difficulty, gameState, setGameState } : GridType)  => {

    const [gridSize, setGridSize] = React.useState<number | null>();
    const [numBombs, setNumBombs] = React.useState<number | null>();
    const [cellIds, setCellIds] = React.useState<cellIds[]>([]);
    const [makeGrid, setMakeGrid] = React.useState<boolean>(false);

    React.useEffect(() => {
      if (gameState === GameState.playing) {
        setGridState();
        setMakeGrid(true);
      }
    }, [gameState]);
    
    React.useEffect(() => {
      if (makeGrid) {
        setGrid();
        setMakeGrid(false);
      }
    }, [makeGrid, difficulty, gameState]);
    

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
    const handleFlip = (cellId: string) => {
        const cell = cellIds.find((item) => item.position === cellId);
        if (!cell || cell.revealed || cell.flag) {
          return;
        }

        if (cell.value === "bomb") {
          setGameState(GameState.lose)
          setCellIds(cellIds.map(cell => ({ ...cell, revealed: true, flag:false })));
          return
        }
      
        const newCellIds = [...cellIds];
      
        cell.revealed = true;
      
        if (cell.value === "0") {
          flipNeighbors(cell, newCellIds);
        }
       

        setCellIds(newCellIds);
        checkIfUserWin()

      };
      
      const getNeighborPositions = (position: string): string[] => {
        const [row, col] = position.split('-').map(Number);
        const positions = [];
      
        if (gridSize) {
          const startRow = Math.max(0, row - 1);
          const endRow = Math.min(gridSize - 1, row + 1);
          const startCol = Math.max(0, col - 1);
          const endCol = Math.min(gridSize - 1, col + 1);
      
          for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
              if (i !== row || j !== col) {
                positions.push(`${i}-${j}`);
              }
            }
          }
        }
      
        return positions;
      };      
      

      const flipNeighbors = (cell: any, newCellIds : cellIds[]) => {
        const neighborPositions = getNeighborPositions(cell.position);
        for (let i = 0; i < neighborPositions.length; i++) {
          const position = neighborPositions[i];
          const neighborCell = newCellIds.find((item: cellIds) => item.position === position);
          if (neighborCell && !neighborCell.revealed) {
            neighborCell.revealed = true;
            if (neighborCell.value === "0") {
              flipNeighbors(neighborCell, newCellIds);
            }
          }
        }
      };
          

      const setBombs = () => {
        if (gridSize && numBombs) {
          let numBombsPlaced = 0;
          let bombCellIds = new Set<string>();
          
          while (numBombsPlaced < numBombs) {
            let randomRow = Math.floor(Math.random() * gridSize);
            let randomCol = Math.floor(Math.random() * gridSize);
            let cellId = `${randomRow}-${randomCol}`;
            
            if (!bombCellIds.has(cellId)) {
              bombCellIds.add(cellId);
              numBombsPlaced++;
            }
          }
          
          return Array.from(bombCellIds);
        }
      }      

      const setGrid = () => {
        if (gridSize && numBombs) {
          const bombCellIds = new Set(setBombs()); // Use a Set for faster lookups
          const cellIds = [];
      
          for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
              const cellId = `${i}-${j}`;
              const isBomb = bombCellIds.has(cellId); // Use Set.has() for faster lookups
              let count = isBomb ? null : 0; // Initialize count to null if cell is a bomb
      
              if (!isBomb) {
                // Count adjacent bombs using only valid coordinates
                for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, gridSize - 1); x++) {
                  for (let y = Math.max(j - 1, 0); y <= Math.min(j + 1, gridSize - 1); y++) {
                    const adjacentId = `${x}-${y}`;
                    if (bombCellIds.has(adjacentId)) count!++;
                  }
                }
              }
      
              cellIds.push({ position: cellId, value: isBomb ? "bomb" : String(count), revealed: false, flag: false });
            }
          }
      
          setCellIds(cellIds);
        }
      };
      
    function handleRightClickToDisplayFlag(event:any,cellId:string) {
      event.preventDefault();
      const cell = cellIds.find((item) => item.position === cellId);
      if (!cell|| cell.revealed) {
        return;
      }
      if (cell.flag === true) {
        cell.flag = false
        const newCellIds = [...cellIds];
        setCellIds(newCellIds);
      }else{
        const newCellIds = [...cellIds];
        cell.flag = true;
        setCellIds(newCellIds);
      }
    }
    const checkIfUserWin=()=>{
     const restOfBombs = cellIds.filter((item)=>item.revealed===false)
     setGameState(GameState.win)  
     if(numBombs && restOfBombs.length === numBombs)
        setGameState(GameState.win)  
    }
      
    const renderGrid = () => {
      let grid = [];
      const cellClassColor = " bg-indigo-700"
      var cellClassEmpty = "grid-cell flex flex-col h-10 w-10 border border-gray-400 rounded-md justify-center items-center"
      if(gridSize && numBombs){
        for(let i = 0; i < gridSize; i ++){
          let row = []
          for(let j = 0 ; j < gridSize; j++){
            let cellId = `${i}-${j}`;
            var cell = cellIds.find(item => item.position === cellId);
            if(cell && cell.position){
              if(cell.value === "bomb"){
                row.push(<div key={cell.position} className={cell.revealed ? cellClassEmpty : cellClassEmpty + cellClassColor} onContextMenu={(e)=> handleRightClickToDisplayFlag(e,cellId)}  onClick={() => handleFlip(cellId)}>{!cell.flag ? cell.revealed ? <i className="fa-solid fa-bomb"></i> : null :<img src={flag} alt="flag"  /> }  </div>);
              } else {
                row.push(<div key={cell.position}  className={cell.revealed ? cellClassEmpty : cellClassEmpty + cellClassColor} onContextMenu={(e)=> handleRightClickToDisplayFlag(e,cellId)} onClick={() => handleFlip(cellId)}> {!cell.flag? parseInt(cell.value) > 0 && cell.revealed ? cell.value : null:<img src={flag} alt="flag"  />}</div>);
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