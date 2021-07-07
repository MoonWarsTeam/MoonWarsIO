import './App.css';
import Game from './Game';
import MainMenu from './MainMenu';
import ServerSelection from './ServerSelection';
import GameSelection from './GameSelection';
import { useState } from 'react';

// todo - make these enums
export const GameState = {
  'MainMenu':0,
  'ServerSelection':1,
  'Game':2,
  'GameSelection':3
};

const GAMES = [
  'NONE',
  'Snake',
  'Tanks'
]

function App() {

  const [gameState, setGameState] = useState(GameState.MainMenu);

  const [currentGame, setCurrentGame] = useState(GAMES[0]); 

  const updateGameState = (newState) => {
    // handle logic
    console.log("Setting Game State to: ", newState);
    setGameState(newState);
  }

  const chooseGame = (whichGame) => {
    
    if (!GAMES.includes(whichGame)) {
      console.log("Game Option does not match available games to play");
      return;
    }
    
    setCurrentGame(whichGame);
    updateGameState(GameState.ServerSelection);
  }

  const renderApplication = () => {
    switch (gameState) {

      case GameState.MainMenu:
        return(
          <MainMenu goToGameSelect={() => updateGameState(GameState.GameSelection)}/>
        );
      case GameState.Game:
        return(
          <div className="GameContainer">
            <Game/>
          </div>
        );
      case GameState.GameSelection:
        return(
          <GameSelection selectGame={(wg) => chooseGame(wg)}/>
        )
      case GameState.ServerSelection:
        return(
          <ServerSelection selectGameServer={() => updateGameState(GameState.Game)} currentGame={currentGame}/>
        );
      default:
        console.log("Unhandled GameState: ", gameState);
        return(
          <MainMenu goToGameSelect={() => updateGameState(GameState.GameSelection)}/>
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
