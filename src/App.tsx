import React from 'react';
import './App.css';
import Board from './components/Board';
import { Difficulty, DifficultyContextType } from './types/difficulty';
import { StateProvider } from './reducer/AppProvider';

const DifficultyContext = React.createContext<DifficultyContextType | null>(null);

function App() {
  const [difficulty, setDifficulty] = React.useState(Difficulty.easy);
  const value = React.useMemo(() => ({ difficulty, setDifficulty }), [difficulty]);
  
  return (
    <DifficultyContext.Provider value={value}>
      <StateProvider>
      <div className="m-10">
        <Board DifficultyContext={DifficultyContext}/>
      </div>
      </StateProvider>
    </DifficultyContext.Provider>
  );
}

export default App;
