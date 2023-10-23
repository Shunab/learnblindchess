import React, { useEffect } from 'react';
import Tile from "./Tile";
import { getRecognition, stopRecognition } from '../../Utils/speechRecognitionSingleton';


const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function Board({ 
    whitePieceImage, 
    blackPieceImage, 
    pieceName,
    PiecePosition,
    handleTileClick,
    isMicEnabled,
    isPieceHidden,
    showCoordinates,
    PieceColor,
    TargetPosition,
    isBoardHidden }){

        

    useEffect(() => {
        const recognitionInstance = getRecognition();
        const handleResult = (event) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript.trim().toUpperCase();
        
            if (event.results[current].isFinal) {
                console.log('spoken transcript:',transcript)

                if (transcript.length === 2 && horizontalAxis.includes(transcript.charAt(0)) && verticalAxis.includes(transcript.charAt(1))) {
                    const x = horizontalAxis.indexOf(transcript.charAt(0));
                    const y = verticalAxis.indexOf(transcript.charAt(1).toString());
                    
                    handleTileClick(x, y, 'voice');
                }
            }
        };

        recognitionInstance.onresult = handleResult;

        recognitionInstance.onerror = (event) => {
            console.error("Error occurred in recognition: " + event.error);
        };

        return () => {
            stopRecognition();
            recognitionInstance.onresult = null;
        };
    }, [handleTileClick, isMicEnabled]);

    let tiles = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
          
            const isPiecePresent = !isPieceHidden && i === PiecePosition[0] && j === PiecePosition[1];
            const isHighlighted = TargetPosition && i === TargetPosition[0] && j === TargetPosition[1];

            tiles.push(
                <Tile 
                key={`${i}-${j}`}
                x={i}
                y={j}
                pieceImage={PieceColor === 'white' ? whitePieceImage : blackPieceImage}
                pieceName={pieceName}
                isPiecePresent={isPiecePresent} // This will be true only if isPieceHidden is false and there's a piece at this position
                handleTileClick={handleTileClick}
                showCoordinates={showCoordinates}
                highlight={isHighlighted}
                />
            );
            
        }
    }
    const viewportWidth = window.innerWidth;
    const desiredBoardSize = viewportWidth < 800 ? viewportWidth - 40 : 800;

    return(
        <div id="board" className={isBoardHidden ? 'hidden-board': ''} style={{width: `${desiredBoardSize}px`, height: `${desiredBoardSize}px`}} >
            {tiles}
        </div>
    );
}

export default Board;