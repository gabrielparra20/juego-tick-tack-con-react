import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './Components/Saquare'
import  {TURNS, Winner_Combos} from './constantes/Board'

// const Square = ({children, isSelected, updateBoard, index}) => {
//   const className = `square ${isSelected ? 'is-selected' : ''} `

// const HandleClick = ()=> {
//   updateBoard(index)
// }


//   return (
//     <div onClick={HandleClick} className={className}>
//       {children}
//     </div>
//   )
// }





 export const App = () => {

  // Estados

    const  [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)
  const [ winner, setWinner] = useState(null)

 
  
const checkWinner = (BoardTocheck)=> {
  for(const combo of Winner_Combos) {
    const [a,b,c] = combo
    if (
      BoardTocheck[a] && 
      BoardTocheck[a] === BoardTocheck[b] &&
      BoardTocheck[a] === BoardTocheck[c]

    ) {
      return BoardTocheck[a]
    }
  }
  // si  no hay ganador
  return null

}  

// reiniciar el juego 

const resetGame = ()=> {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
}

// cuando hay empate

 const CheckGame = (newBoard)=> {
  return newBoard.every((square)=> square != null)
 }



const updateBoard = (index)=> {
 // actualizando  en esta posicion 
 // si ya tiene algo 
 if(board[index] || winner) return
 // actualizar tablero
 const newBoard = [...board]
 newBoard[index] = turn
 setBoard(newBoard)
 // cambiar el turno
 const newTurn = turn === TURNS.X ? TURNS.O :TURNS.X
  setTurn(newTurn)

// si hay un ganador 
const newWiner = checkWinner(newBoard)
 if (newWiner) {
  confetti()
  setWinner(newWiner)
 } else if (CheckGame(newBoard)) {
   setWinner(false)
 }


  }



  return (
    <>
    <main className='board'>
    <h1> juego de la X</h1>
    <button onClick={resetGame}>reiniciar el juego</button>
    <section className='game'>
      {
        board.map((square, index)=>{
          return(
            <Square key = {index} index = {index} updateBoard={updateBoard}>

            {board[index]}
            </Square>
          )
        })
      }

    </section>

      <section className='turn'>
       <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
       </Square>

        <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
       </Square>

      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
            <h2>
              {
                winner == false
                ?'empate'
                :'Gano' 
              }
            </h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>empezar de nuevo</button>
            </footer>
            </div>

          </section>
        )
      }


    </main>
    </>
  )
}



