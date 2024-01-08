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
  const [score, setScore] = useState({"X":0, "O": 0});
  
  const checkIfWin = () => {
    // Horizontal
    for (let i=0; i<=2; i++){
      if (moves[i][0] !== "") {
        if (moves[i][0] === moves[i][1] && moves[i][1] === moves[i][2]) {
          return true;
        }
      }
    }
    
    // Vertical
    for (let i=0; i<=2; i++){
      if (moves[0][i] !== "") {
        if (moves[0][i] === moves[1][i] && moves[1][i] === moves[2][i]) {
          return true;
        }
      }
    }
    
    // Diagonal
    if (moves[0][0] !== "") {
      if (moves[0][0] === moves[1][1] && moves[1][1] === moves[2][2]) {
        return true;
      }
    }

    if (moves[0][2] !== "") {
      if (moves[0][2] === moves[1][1] && moves[1][1] === moves[2][0]) {
        return true;
      }
    }

    return false;

  }

  const checkIfDraw = () => {
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (moves[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  }

  const updateBoard = (row, col) => {
    const newMoves = [...moves];
    newMoves[row][col] = player;
    setMoves(newMoves);
  }

  const changePlayer = () => {
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }


  const playMove = (row, col) => {
    if (winner === ""){
      if (moves[row][col] !== "X" && moves[row][col] !== "O") {
        updateBoard(row, col);
        const didWin = checkIfWin();
        const isDraw = checkIfDraw();
        if (didWin) {
          setWinner(`Winner: ${player}`);
        } else if (isDraw) {
          setWinner("DRAW");
        }
        
        changePlayer();
      }
    }
  }
  
  const resetGame = () => {
    setMoves([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setPlayer("X");
    setWinner("");
  }

  return (
    <div className='App'>
      {winner && 
      <div className='WinnerDisplay'>
        <h2>{winner}</h2>
        <div className='Actions'>
          <button>Next Match</button>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </div>
      }
      <div className='GameTitle'>
        <h1>Tic-Tac-Toe</h1>
      </div>
      <div className='TicTacToeBoard'>
        {moves.map((row, row_index) => {
          return row.map((col, col_index) => {
           return <button key={`${row_index}-${col_index}`} className='Square' onClick={() => {playMove(row_index, col_index)}} disabled={winner !== ""}>{col}</button>
          });
        })}
      </div>
      <div className='GameDetails'>
        <div className='PlayerScores'>
            X: {score.X}, O: {score.O}
        </div>
        {winner === "" &&
          <div className='PlayerTurn'>
            Player Turn: {player}
          </div>
        }
      </div>
    </div>
  );
}

export default App;

