import React, { useState } from 'react';
import Square from './Square';
import axios from "axios";


const Board: React.FC = () => {

    const [boardSize, setBoardSize] = useState(3);
    const [squares, setSquares] = useState(Array(boardSize*boardSize).fill(''));
    const [isXNext, setIsXNext] = useState(true);

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBoardSize(Number(event.target.value));
        resetGame();

    };

    const handleClick = (index: number) => {

        if (squares[index] !== '' || calculateWinner(squares, boardSize)) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);
    };

    const renderSquare = (index: number) => {
        return (
            <Square 
                key={index} 
                value={squares[index]} 
                onClick={() => handleClick(index)} 
            />
        );
    };

    const resetGame = () => {
        setSquares(Array(boardSize * boardSize).fill(''));
        setIsXNext(true);
    };

    
    const createBoard = () => {
        let board: JSX.Element[] = [];
        for (let i = 0; i < boardSize; i++) {
          let row: JSX.Element[] = [];
          for (let j = 0; j < boardSize; j++) {
            row.push(renderSquare(i * boardSize + j));
          }
          board.push(<div key={i} className="flex gap-1">{row}</div>);
        }
        return board;
      };

    // Add Game Result to DB 
    const addOutcometoDB = async (winner : string, boardSize: number) => {

        await axios.post('http://localhost:3002/stats', {
            "Winner": `${winner}`,
            "Board": `${boardSize} by ${boardSize}`,
            "TimeStamp": new Date().toLocaleString()  
        });

    };
    // Update Player Winning Stats (Games Won) in the DB
    const updateWinnerStats = async (winner: string) => {

        let winStats = await axios.get('http://localhost:3002/winnerStats');
        let playerWinCount: number;
        if (winner === 'X') {
            playerWinCount = winStats.data[0]["winningCount"];
        } else {
            playerWinCount = winStats.data[1]["winningCount"];
        }
        playerWinCount += 1

        axios.put(`http://localhost:3002/winnerStats/${winner}`, {
            winningCount: playerWinCount,
        })

    };

    const winner = calculateWinner(squares, boardSize);
    let status;
    if (winner === 'X' || winner === 'O') {
        status = `Winner: ${winner}`;

        // Update Stats
        addOutcometoDB(winner, boardSize);

        // Update Winner Count
        updateWinnerStats(winner);
        
    } else if (winner === 'Match Drawn'){
        status = winner;
        addOutcometoDB(winner, boardSize)

    } else {
        status = `Next player: ${isXNext ? 'X' : 'O'}`;
    }

    return (
        <div className='flex flex-col gap-1 items-center'>
            <div className="mb-4">
            <label className="mr-2">Select Board Size:</label>
            <select value={boardSize} onChange={handleSizeChange} className="border p-2">
              {Array.from({ length: 13 }, (_, i) => i + 3).map(size => (
                <option key={size} value={size}>
                  {size} x {size}
                </option>
              ))}
            </select>
          </div>
        <div className="flex items-center justify-center gap-1 mb-4 text-2xl font-bold">{status}</div>
        {createBoard()}
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={resetGame}>Start New Game</button>
        </div>
    );
};

const calculateWinner = (squares: string[], boardSize: number): string | null => {
    let emptySquares =  boardSize*boardSize;
    const lines: number[][] = [];
  
    // Rows
    for (let i = 0; i < boardSize; i++) {
      lines.push(Array.from({ length: boardSize }, (_, j) => i * boardSize + j));
    }
  
    // Columns
    for (let i = 0; i < boardSize; i++) {
      lines.push(Array.from({ length: boardSize }, (_, j) => i + j * boardSize));
    }
  
    // Diagonals
    lines.push(Array.from({ length: boardSize }, (_, i) => i * (boardSize + 1)));
    lines.push(Array.from({ length: boardSize }, (_, i) => (i + 1) * (boardSize - 1)));
  
    for (let i = 0; i < lines.length; i++) {
      const [a, ...rest] = lines[i];
      if (squares[a] && rest.every(index => squares[index] === squares[a])) {
        return squares[a];
      }
    }

    for (let ind = boardSize * boardSize - 1; ind >= 0; ind--) {
        if (squares[ind] !== '') {
            emptySquares--;
        }
    }

    if (emptySquares === 0) {
        return 'Match Drawn';
    }
    return null;
  };



export default Board;