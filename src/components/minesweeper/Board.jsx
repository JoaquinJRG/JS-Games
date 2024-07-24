import { useEffect, useState } from "react"
import { createCoverMatrix, createBoard, addMines, addNumbers, checkWin } from "./gameLogic"
import { Cell } from "./Cell"
import { Modal } from "./Modal"
import { Button } from "./Button"

export function Board({ cols = 9, rows = 9, mines = 10 }) {
  const [coverMatrix, setCoverMatrix] = useState(null)
  const [board, setBoard] = useState(null)
  const [reset, setReset] = useState(false)
  const [win, setWin] = useState(false)
  const [gameOver, setGameOver] = useState(false);

  let minesPosition = []

  useEffect(() => {
    let newBoard = [];
    let newCoverMatrix = [];
    minesPosition = [];

    createCoverMatrix(newCoverMatrix, rows, cols);
    createBoard(newBoard, rows, cols);
    addMines(newBoard, rows, cols, minesPosition, mines);
    addNumbers(newBoard, rows, cols, minesPosition);

    setCoverMatrix(newCoverMatrix);
    setBoard(newBoard);

  }, [reset])

  useEffect(() => {

    if (coverMatrix === null) return;

    const updatedCoverMatrix = [...coverMatrix];

    if (checkWin(mines, updatedCoverMatrix, rows, cols)) {
      setWin(true);
    }

  }, [coverMatrix])

  const revealEmptyCells = (x, y) => {
    if (x < 0 || x >= rows || y < 0 || y >= cols || !coverMatrix[x][y]) {
      return;
    }

    // Revelar la casilla
    const updatedCoverMatrix = [...coverMatrix];
    updatedCoverMatrix[x][y] = false;
    setCoverMatrix(updatedCoverMatrix);

    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    if (board[x][y] === 0) {
      for (const [dx, dy] of directions) {
        revealEmptyCells(x + dx, y + dy);
      }
    }

  }

  const resetBoard = () => {
    minesPosition = [];
    setGameOver(false);
    setBoard(null);
    setReset(!reset);
    setWin(false);
    setGameOver(false);
  }

  return (
    <main>
      <section className="flex flex-col gap-1">
        {board && board.map((row, i) => {
          return (
            <div key={i} className="flex gap-1">
              {row.map((cell, j) => {
                return (
                  <Cell
                    newCover={coverMatrix[i][j]}
                    coverMatrix={coverMatrix}
                    setCoverMatrix={setCoverMatrix}
                    setGameOver={setGameOver}
                    i={i}
                    j={j}
                    revealEmptyCells={revealEmptyCells}
                    key={`${i}-${j}`}
                  >
                    {cell}
                  </Cell>
                )
              })}
            </div>
          )
        })}
      </section>
      <section className="flex justify-center mt-5">
        <Button clickFunction={resetBoard}>Reset</Button>
      </section>
      {gameOver && <Modal text="Has perdido" clickFunction={resetBoard} />}
      {win && <Modal text="Has ganado" clickFunction={resetBoard} />}
    </main>
  )


}