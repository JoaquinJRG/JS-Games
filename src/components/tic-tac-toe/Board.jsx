import { useState } from "react"
import { Square } from "./Square"
import { WinnerModal } from "./WinnerModal.jsx"

const TURNS = {
  x: "x",
  o: "o"
}

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export function Board() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState("x")
  const [winner, setWinner] = useState(false)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn("x")
    setWinner(false)
  }

  const checkWinner = (checkBoard) => {
    for (const combo of WIN_CONDITIONS) {
      const [a, b, c] = combo

      if (checkBoard[a] &&
        (checkBoard[a] === checkBoard[b] && checkBoard[a] === checkBoard[c])) {
        setWinner(checkBoard[a])
        return true
      }
    }

    return null
  }

  const updateBoard = (i) => {

    if (board[i]) return

    const newTurn = (turn === TURNS.x) ? TURNS.o : TURNS.x
    setTurn(newTurn)

    const newBoard = [...board]
    newBoard[i] = turn
    setBoard(newBoard)

    checkWinner(newBoard)

  }


  return (
    <main className="shadow-secundary py-5 px-10 bg-white border border-secundary">
      {
        winner ? (
          <WinnerModal resetGame={resetGame} winner={winner} />
        ) : (
          <>
            <div className="flex justify-center mb-5">
              <button
                className="px-5 border border-primary shadow-primary hover:border-secundary hover:shadow-secundary transition-all hover:text-secundary"
                onClick={resetGame}
              >RESET</button>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {
                board.map((square, i) => (
                  <Square key={i} i={i} updateBoard={updateBoard}>
                    {square}
                  </Square>
                ))
              }
            </div>
            <p className="text-center mt-5">Turn: <span className="text-xl">{turn}</span></p>
          </>
        )
      }
    </main>
  )
}