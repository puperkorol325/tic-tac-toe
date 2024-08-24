import logo from './logo.svg';
import './App.css';
import { Playgrid } from './component/playgrid';
import { whoseTurnToPlay } from './constants/whoseTurnToPlay';
import { useState } from 'react';

function App() {

  const [turn, setTurn] = useState(whoseTurnToPlay);

  const turnToPlay = turn == "circles" ? "Circle's turn to play" : "Cross's turn to play ";

  const handleTurnChange = (a) => {
    setTurn(a);
  }

  return (
    <div className='game'>
      <h1>Tic-Tac-Toe</h1>
      <Playgrid onTurnChange={handleTurnChange}/>
      <h2>{turnToPlay}</h2>
    </div>
  );
}

export default App;
