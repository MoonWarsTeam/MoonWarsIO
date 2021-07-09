import './App.css';
import Game from './Game';
import MainMenu from './MainMenu';
import Header from './Header';
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
  'Agario',
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
          <div>
            <Header />
            <MainMenu goToGameSelect={() => updateGameState(GameState.GameSelection)}/>
          </div>
        );
      case GameState.Game:
        return(
          <div className="GameContainer">
            <Game/>
          </div>
        );
      case GameState.GameSelection:
        return(
          <div>
            <Header />
            <GameSelection selectGame={(wg) => chooseGame(wg)}/>
          </div>
        )
      case GameState.ServerSelection:
        return(
          <div>
            <Header />
            <ServerSelection selectGameServer={() => updateGameState(GameState.Game)} currentGame={currentGame}/>
          </div>
        );
      default:
        console.log("Unhandled GameState: ", gameState);
        return(
          <div>
            <Header />
            <MainMenu goToGameSelect={() => updateGameState(GameState.GameSelection)}/>
          </div>        
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
