export function WinnerModal({ winner, resetGame }) {

  const handleClick = () => {
    resetGame()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2>Winner</h2>
      <div className="border border-primary h-10 w-10 flex items-center justify-center text-3xl">
        {winner}
      </div>
      <button
        className="px-5 border border-primary shadow-primary hover:border-secundary hover:shadow-secundary transition-all hover:text-secundary"
        onClick={handleClick}>New Game</button>
    </div>
  )
}