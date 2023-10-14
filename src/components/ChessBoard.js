import React, { useState, useEffect, useCallback, useMemo  } from 'react';
import './Chessboard.css';
import { PiecePositionSelector } from './PiecePositionSelector';
import { startRecognition, stopRecognition, getRecognition } from '../Utils/speechRecognitionSingleton';
import micOn from '../assets/images/micOn.svg';
import micOff from '../assets/images/micOff.svg';


const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function Chessboard({
    whitePieceImage, 
    blackPieceImage, 
    getValidMovesFunction, 
    pieceName
  } ) {

  const [isBoardHidden, setIsBoardHidden] = useState(false);
  const [isPieceHidden, setIsPieceHidden] = useState(false);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
 

  const toggleMic = () => {
    if (isMicEnabled) {
        stopRecognition();
        setIsMicEnabled(false);
    } else {
        startRecognition();
        setIsMicEnabled(true);
    }
 };



  const toggleCoordinates = () => {
    setShowCoordinates(prevState => !prevState);}


  const [PiecePosition, setPiecePosition] = useState([0, 0]);
  const synth = window.speechSynthesis;
  const utterThis = useMemo(() => new SpeechSynthesisUtterance('Invalid move.'), []);

  
  const [PieceColor,setPieceColor] = useState('white');
  const selectPieceColor = (color) => {setPieceColor(color);}

  const handlePositionChange = (newPosition) => {setPiecePosition(newPosition);}


  const handleTileClick = useCallback((x, y, source = 'click') => {
    console.log("handleTileClick called with", x, y);
    const validMoves = getValidMovesFunction(PiecePosition);
    
    if (!isMicEnabled && source === 'voice') {
        console.log("Mic is disabled. Ignoring voice command.");
        return;
    }

    if (validMoves.some(move => move[0] === x && move[1] === y)) {
        setPiecePosition([x, y]);
    } else {
        synth.speak(utterThis);
    }
 }, [PiecePosition, synth, utterThis, isMicEnabled, getValidMovesFunction]);



 useEffect(() => {
    const recognitionInstance = getRecognition();
    const handleResult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.trim().toUpperCase();
    
        if (event.results[current].isFinal) {
            console.log('Spoken transcript:', transcript);
    
            if (transcript.length === 2 && horizontalAxis.includes(transcript.charAt(0)) && verticalAxis.includes(transcript.charAt(1))) {
                const x = horizontalAxis.indexOf(transcript.charAt(0));
                const y = verticalAxis.indexOf(transcript.charAt(1).toString());
                console.log('Deciphered board position:', [x, y]);
                handleTileClick(x, y, 'voice');
            }
        }
    };

    recognitionInstance.onresult = handleResult;

    recognitionInstance.onerror = (event) => {
        console.error("Error occurred in recognition: " + event.error);
    };


    return () => {
        // Always stop recognition when this effect is cleaned up.
        stopRecognition();
        recognitionInstance.onresult = null; // Cleaning up the handler
    };
 }, [handleTileClick, isMicEnabled]);


    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2;
            const coordinate = `${horizontalAxis[i]}${verticalAxis[j]}`; // A1, B1 format
            const pieceImage = PieceColor === 'white' ? whitePieceImage : blackPieceImage;
    
            if (i === PiecePosition[0] && j === PiecePosition[1] && !isPieceHidden) {
                // This is the knight's position. Render the tile with the knight on it.
                const pieceImg  = <img src={pieceImage} alt={pieceName} className={pieceName}/>;
    
                if (number % 2 === 0) {
                    board.push(
                        <div className="tile black-tile"  key={`${i}-${j}`} onClick={() => handleTileClick(i, j)}>
                            {pieceImg }
                            
                        </div>
                    );
                } else {
                    board.push(
                        <div className="tile white-tile" key={`${i}-${j}`} onClick={() => handleTileClick(i, j)}>
                            {pieceImg }
                            
                        </div>
                    );
                }
            } else {
                // Regular tile rendering logic
                if (number % 2 === 0) {
                    board.push(
                        <div className="tile black-tile" key={`${i}-${j}`} onClick={() => handleTileClick(i, j)}>
                            {showCoordinates && <span className="coordinate white-text">{coordinate}</span>}
                        </div>
                    );
                } else {
                    board.push(
                        <div className="tile white-tile" key={`${i}-${j}`} onClick={() => handleTileClick(i, j)}>
                            {showCoordinates && <span className="coordinate black-text">{coordinate}</span>}
                        </div>
                    );
                }
            }
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return( 
    <div className='container'>

    <div className="board-and-mic"> 
        <div id="chessboard" className={isBoardHidden ? 'hidden-board': ''}>{board}</div>

        <div className='MicContainer'>
            <button className='Mic' onClick={toggleMic}>
                {isMicEnabled ? 
                    <img src={micOff} alt="Mic Off" /> : 
                    <img src={micOn} alt="Mic On" />
                }
            </button>
        </div>
    </div>

        <div className='controls'>
    
    <div className="control-container">
        <div className="control-label">Piece Position</div>
        <PiecePositionSelector currentPosition={PiecePosition} onPositionChange={handlePositionChange} />
    </div>

    <div className="control-container">
        <div className="control-label">Select Color</div>
        <div className="Piece-selection">
            <img 
                src={whitePieceImage} 
                alt={`White ${pieceName}`} 
                className={PieceColor === 'white' ? 'selected' : ''} 
                onClick={() => selectPieceColor('white')}
            />
            <img 
                src={blackPieceImage} 
                alt={`Black ${pieceName}`} 
                className={PieceColor === 'black' ? 'selected' : ''} 
                onClick={() => selectPieceColor('black')}
            />
        </div>
    </div>

    <div className="control-container">
        <div className="control-label">Piece Visibility</div>
        <div className='ButtonContainer' onClick={() => setIsPieceHidden(!isPieceHidden)}>
            <button className='myButton' >
            {isPieceHidden ? `Show ${capitalizeFirstLetter(pieceName)}` : `Hide ${capitalizeFirstLetter(pieceName)}`}
            </button>
        </div>
    </div>

    <div className="control-container">
        <div className="control-label">Board Visibility</div>
        <div className='ButtonContainer' onClick={() => setIsBoardHidden(!isBoardHidden)}>
            <button className='myButton' >
                {isBoardHidden ? "Show Board" : "Hide Board"}
            </button>
        </div>
    </div>

    <div className="control-container">
        <div className="control-label">Coordinates</div>
        <div className='ButtonContainer' onClick={toggleCoordinates}>
            <button className='myButton' >
                {showCoordinates ? "Hide Coordinates" : "Show Coordinates"}
            </button>
        </div>
    </div>

    
</div>

    

    </div>);
}

export default Chessboard;
