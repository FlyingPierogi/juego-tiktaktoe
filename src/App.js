import React, { useState, useEffect, useRef } from "react";
import backgroundStart from "./img/bg-main.jpg";
import backgroundGame from "./img/bg-game/cave.jpg";
import steveWins from "./img/player/steve-wins.png";
import creeperWins from "./img/player/creeperWins.png";
import sword from "./img/player/sword.png";
import tnt from "./img/player/tnt.png";
import drawpic from "./img/player/stevexcreeper.jpg";
import steveTurn from "./img/player/steveTurn.png";
import creeperTurn from "./img/player/creeperTurn.png";
import steveFace from "./img/player/steveFace.png";
import creeperFace from "./img/player/creeperFace.png";

function Board() {
  const [xIsNext, setXIsNext] = useState(Math.random() < 0.5); // Randomly set xIsNext to true or false
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [draw, setDraw] = useState(0);

  const [gameStarted, setGameStarted] = useState(0);
  const [playerFaces, setPlayerFaces] = useState(null);
  const [visibility, setVisibility] = useState('visible');
  const [startMessageDisplayed, setStartMessageDisplayed] = useState(false);

  let status;
  let playerImage;
  const dummy= useRef(false);
  const winner = calculateWinner(squares);

  useEffect(() => {
    if (gameStarted === 0) {
      const newPlayerFaces = xIsNext ? steveFace : creeperFace;
      //document.body.style.background="#fff";
      setPlayerFaces(newPlayerFaces);
      setGameStarted(1);
      setTimeout(() => {
        setVisibility('hidden'); // Update visibility after the delay
      }, 2000); // 3000 milliseconds (3 seconds) delay
    }
  }, [gameStarted]); // Run the effect only when gameStarted changes

   function handleClick(i) {
    setStartMessageDisplayed(true);
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";
    } else{
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setDraw(draw + 1);
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setDraw(0);
    setXIsNext(Math.random() < 0.5);
    /*anadir el reset que dijo kamil*/
    setStartMessageDisplayed(false);
    setGameStarted(0);
    setVisibility('visible');
  };

  if (xIsNext) {
    playerImage=steveTurn;
  }
  else{
    playerImage=creeperTurn;
  }

  if (winner) {
    status = "The winner is: ";
    if (winner === "X") {
      playerImage=steveWins;
    } else {
      playerImage=creeperWins;
    }
  } else if(draw===9 && !winner){
    status= "The game is a draw!";
    playerImage=drawpic;
  } else{ //no winner
    /////////
    if (!startMessageDisplayed) {
      // Display the start message only once after the game has started
      status = xIsNext ? "Steve starts" : "Creeper starts";
    } else {
      // Display "Next player: " for subsequent turns
      status = "Next player: ";
    }
    playerImage = xIsNext ? steveTurn : creeperTurn;
  }

  return (
    <>
    <div className="player-faces" id="player-faces" style={{ visibility, backgroundImage: `url(${playerFaces})` }}></div>
    <div className="grid-game">
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <div className="player-info">
        <div className="status">
          {status}
        </div>
        <div className="status-image" id="status-image" style={{ backgroundImage: `url(${playerImage})` }}>
        </div>
        <div className="center-div">
          <button className="button-restart" onClick={handleRestart}>RESTART</button>
        </div>
      </div>
    </div>  
    </>
  );
}

function Square({ value, onSquareClick }) {
  if(value === "X" ){
    return (
      <input type="image" className="square" id="square" src={sword} onClick={onSquareClick}></input>
    );
  } else if (value === "O"){
    return (
      <input type="image" className="square" id="square" src={tnt} onClick={onSquareClick}></input>
    );
    } else {
      return (
        <input type="button" className="square" id="square" value="" onClick={onSquareClick}></input>
      );
      }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function StartGame() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleClickStart = () => {
    setGameStarted(true);
  };
  //Checking if the game started to pick the proper backgroundimage
  gameStarted ? document.body.style.backgroundImage = `url(${backgroundGame})` : document.body.style.backgroundImage = `url(${backgroundStart})`;

  return (
    <>
      {gameStarted ? (
        <Board />
      ) : (
        <button className="button-start" onClick={handleClickStart}>START</button>
      )}
    </>
  );
}