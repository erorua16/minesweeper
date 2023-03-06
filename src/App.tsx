import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import { Difficulty, DifficultyContextType } from './types/difficulty';

const DifficultyContext = React.createContext<DifficultyContextType | null>(null);

function App() {
  const [difficulty, setDifficulty] = React.useState(Difficulty.default);
  const value = React.useMemo(() => ({ difficulty, setDifficulty }), [difficulty]);
  
  return (
    <DifficultyContext.Provider value={value}>
      <div className="m-10">
        <Board DifficultyContext={DifficultyContext}/>
      </div>
    </DifficultyContext.Provider>
  );
}

export default App;
