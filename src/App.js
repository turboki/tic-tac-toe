import { useState } from 'react';
import './App.css';

function App() {
  const [moves, setMoves] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  
  const checkIfWin = () => {
    // Vertical
    if (
      (!!moves[0][0] && moves[0][0] === moves[1][0] && moves[0][0] === moves[2][0]) ||
      (!!moves[0][1] && moves[0][1] === moves[1][1] && moves[0][1] === moves[2][1]) ||
      (!!moves[0][2] &&moves[0][2] === moves[1][2] && moves[0][2] === moves[2][2]) 
    ) {
      setWinner(player);
    }
    // Horizontal

    // Diagonal

  }


  const playMove = (row, col) => {
    const newMoves = [...moves];
    newMoves[row][col] = player;
    setMoves(newMoves);
    checkIfWin();
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }
  return (
    <div className='App'>
      {winner && <h2>Winner {winner}</h2>}
      <div className='TicTacToeBoard'>
        {moves.map((row, row_index) => {
          return row.map((move, col_index) => {
           return <button className='Square' onClick={() => {playMove(row_index, col_index)}} disabled={!!move || !!winner}>{move}</button>
          });
        })}
      </div>
    </div>
  );
}

export default App;

