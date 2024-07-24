export function Square({ children, i, updateBoard }) {


  return (
    <div
      className="flex items-center justify-center w-28 h-28 border border-primary cursor-pointer text-5xl select-none"
      onClick={() => updateBoard(i)}
    >
      {children}
    </div>
  )
}