
import './App.css';
import MemoGameBoard from './MemoGameBoard';
import UserControls from './UserControls';
import React, { useState } from 'react';

function App() {
  const initialGameSettings = {
    numOfTiles : 22,
    includeBomb : true
  }

  const [settings, setSettings] = useState(initialGameSettings);
  const [userReady, setReady] = useState(false);

  const startGame = (_numOfTiles, _includeBomb) => {
    const settings = {
      numOfTiles: _numOfTiles,
      includeBomb: _includeBomb
    };
    setSettings(settings);
    setReady(true);
  };

  const updateSettings = (_numOfTiles, _includeBomb) => {
    const settings = {
      numOfTiles: _numOfTiles,
      includeBomb: _includeBomb
    };
    setSettings(settings);
  }

  const startNewGame = () => {
    setReady(false);
  }


  return (
    <div className="App">
      <header className="App-header">
          {userReady ?  <MemoGameBoard numberOfTiles={settings.numOfTiles} includeBomb={settings.includeBomb} startNewGame={startNewGame} /> : 
                        <UserControls numberOfTiles={settings.numOfTiles} includeBomb={settings.includeBomb} startGame={startGame} updateSettings={updateSettings}/>}
      </header>
      
    </div>
  );
}

export default App;
