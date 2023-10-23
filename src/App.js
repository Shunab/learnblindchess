import React, { useState } from 'react';
import Chessboard from './components/chessboard/ChessBoard';
import whiteKnightImage from './assets/images/knight_w.svg';
import blackKnightImage from './assets/images/knight_b.svg';
import whiteBishopImage from './assets/images/bishop_w.svg';
import blackBishopImage from './assets/images/bishop_b.svg';
import whiteRookImage from './assets/images/rook_w.svg';
import blackRookImage from './assets/images/rook_b.svg';
import whiteQueenImage from './assets/images/queen_w.svg';
import blackQueenImage from './assets/images/queen_b.svg';
import Header from './components/Header/Header';
import './App.css'


import { getValidKnightMoves, getValidBishopMoves, getValidRookMoves, getValidQueenMoves } from './Utils/ChessLogic';

function App() {
  const [currentPiece, setCurrentPiece] = useState('knight');

  const pieceData = {
    knight: {
      whiteImage: whiteKnightImage,
      blackImage: blackKnightImage,
      getValidMoves: getValidKnightMoves
    },
    bishop: {
      whiteImage: whiteBishopImage,
      blackImage: blackBishopImage,
      getValidMoves: getValidBishopMoves
    },
    rook: {
      whiteImage: whiteRookImage,
      blackImage: blackRookImage,
      getValidMoves: getValidRookMoves
    },
    queen: {
      whiteImage: whiteQueenImage,
      blackImage: blackQueenImage,
      getValidMoves: getValidQueenMoves
    }
  };

  const handlePieceChange = (event) => {setCurrentPiece(event.target.value);}

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        
      </header>
      <main >
        <div className="piece-selection">
          {['knight', 'bishop', 'rook', 'queen'].map(piece => (
            <label key={piece}>
              <input 
                type="radio" 
                value={piece} 
                checked={currentPiece === piece}
                onChange={handlePieceChange}
              />
              {piece.charAt(0).toUpperCase() + piece.slice(1)}
            </label>
          ))}
        </div>
        <div className='main'>
          <Chessboard 
            whitePieceImage={pieceData[currentPiece].whiteImage}
           blackPieceImage={pieceData[currentPiece].blackImage}
           getValidMovesFunction={pieceData[currentPiece].getValidMoves}
            pieceName={currentPiece}
          />
        </div>
      </main>
      <footer>
        {/* Any footer information */}
      </footer>
    </div>
  );
}

export default App;
