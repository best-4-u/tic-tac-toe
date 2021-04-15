import React, { useState, useEffect } from 'react';
import './App.css';
import Cell from './Cell';


function App() {
  const [matrix, setMatrix] = useState([[0,0,0],[0,0,0],[0,0,0]]);
  const [turn, changeTurn] = useState(1);
  const [gameIsFinished, finishGame] = useState(false);
  const [winner, setWinner] = useState(0);

  useEffect( () => {
    const firstDiag = () => {
      let prev :number = 0;
      let count :number = 0;
      for (let i :number = 0; i < matrix.length; i++){
        let element :number = matrix[i][i];
        if (element === 0) break;
        if (i !== 0 && element !== prev){
          break;
        } else {
          count++;
        }
        prev = element;
      }
  
      if (count === 3) {
        finishGame(true);
        setWinner(turn === 1 ? 2 : 1);
        return true;
      }

      return false;
    };

    const secondDiag = () => {
      let prev :number = 0;
      let count :number = 0;
      for (let i :number = matrix.length -1; i >= 0; i--){
        const max :number = 2;
        let element :number = matrix[max-i][i];
        if (element === 0) break;
        if (i !== max && element !== prev){
          break;
        } else {
          count++;
        }
        prev = element;
      }

      if (count === 3) {
        finishGame(true);
        setWinner(turn === 1 ? 2 : 1);
        return true;
      }

      return false;
    };

    const lines = () => {
      let winner :boolean = false;

      for (let i :number = 0; i < 3; i++){
        if (matrix[i][0] === matrix[i][1] && matrix[i][0] === matrix[i][2] && matrix[i][0] !== 0){
          winner = true;
          break;
        }
      }

      if (!winner) {
        for (let i :number = 0; i < 3; i++){
          if (matrix[0][i] === matrix[1][i] && matrix[0][i] === matrix[2][i] && matrix[0][i] !== 0){
            winner = true;
            break;
          }
        }
      }
  
      if (winner) {
        finishGame(true);
        setWinner(turn === 1 ? 2 : 1);
        return true;
      }

      return false;
    };

    const checkFirstDiag = firstDiag();
    if (checkFirstDiag) return;
    const checkSecondDiag = secondDiag();
    if (checkSecondDiag) return;
    const checkLines = lines();
    if (checkLines) return;

    return;
  }, [turn, matrix]);


  const onClickItem = (element: number, subElement: number) :void => {
    const mMatrix = [...matrix];
    mMatrix[element][subElement] = turn;

    changeTurn(turn === 1 ? 2 : 1);
    setMatrix(mMatrix);
  };

  const showWinner = () :any => {
    if(gameIsFinished) {
      return <div> { `Winner is: ${winner === 1 ? "X": "O"}` } </div>
    }
    return null;
  }
  
  return (
    <div className="App">
      <div className="body">
        
        {showWinner()}
        <div className="grid_container">
          { matrix.map( (item: number[], element :number) => {
            return item.map( (innerItem: number, subElement :number) => {
              return (
                <Cell
                  key={`${element}-${subElement}`} 
                  element={element} 
                  subElement={subElement} 
                  changeElement={onClickItem}
                  matrix={matrix}
                />
              );
            });
          }) }
        </div>
      </div>
    </div>
  );
}

export default App;
