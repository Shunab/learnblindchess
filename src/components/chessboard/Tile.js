import React from 'react';
import './Chessboard.css';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];


function Tile({
  x, 
  y, 
  isPiecePresent,
  handleTileClick, 
  pieceImage, 
  pieceName,
  showCoordinates,
  highlight 
}) {

  const number = (x + y) % 2;
  const coordinate = `${horizontalAxis[x]}${verticalAxis[y]}`; 
  
  return (
    <div 
  className={`tile ${number % 2 === 0 ? 'black-tile' : 'white-tile'} ${highlight ? 'highlight-tile' : ''}`} 
  key={`${x}-${y}`} 
  onClick={() => handleTileClick(x, y)}
>
  {isPiecePresent && <img src={pieceImage} alt={pieceName} className={pieceName} />}
  {showCoordinates && !isPiecePresent && <span className={`coordinate ${number % 2 === 0 ? 'white-text' : 'black-text'}`}>{coordinate}</span>}
</div>

  );
}

export default Tile;
