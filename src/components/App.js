import './App.css';
import Game from './Game';
import MainMenu from './MainMenu';
import ServerSelection from './ServerSelection';
import { useState } from 'react';

// todo - make these enums
export const GameState = {
  'MainMenu':0,
  'ServerSelection':1,
  'Game':2
};

function App() {

  const [gameState, setGameState] = useState(GameState.MainMenu);

  const updateGameState = (newState) => {
    // handle logic
    console.log("Setting Game State to: ", newState);
    setGameState(newState);
  }

  const renderApplication = () => {
    switch (gameState) {

      case GameState.MainMenu:
        return(
          <MainMenu selectServer={() => updateGameState(GameState.ServerSelection)}/>
        );
      case GameState.Game:
        return(
          <div className="GameContainer">
            <Game/>
          </div>
        );
      case GameState.ServerSelection:
        return(
          <ServerSelection selectGameServer={() => updateGameState(GameState.Game)}/>
        );
      default:
        console.log("Unhandled GameState: ", gameState);
        return(
          <MainMenu selectServer={() => updateGameState(GameState.ServerSelection)}/>
        );
    }
  }

  return (
    <div className="App">
      {renderApplication()}
    </div>
  );


  
}

export default App;
