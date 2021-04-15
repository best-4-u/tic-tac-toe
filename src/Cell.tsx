import React from 'react';

interface ICell {
  element: number,
  subElement: number,
  matrix: number[][],
  changeElement: Function
};

function Cell({element, subElement, matrix, changeElement}: ICell) {

  const showElement = () :String => {
    const item = matrix[element][subElement];

    if (item === 0) {
      return "";
    } else if(item === 1){
      return "X";
    } else {
      return "O";
    }
  };

  const onClickItem = () => {
    changeElement(element, subElement);
  };
  
  return (
    <div
      className="cell"
      onClick={onClickItem}
    > 
      { showElement() }
    </div>
  );
}

export default Cell;
