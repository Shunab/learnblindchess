import React, { useState, useEffect, useCallback } from 'react';
import './Chessboard.css';
import Board from './Board';
import { PiecePositionSelector } from '../PiecePositionSelector/PiecePositionSelector';
import { muteMediaElements, muteSpeech, startRecognition, stopRecognition, unmuteMediaElements } from '../../Utils/speechRecognitionSingleton';
import { challenges } from '../challenges/challengeList';
import MicToggle from './MicToggle';
import { convertToChessNotation } from '../challenges/challengeList';

function Chessboard({
    whitePieceImage, 
    blackPieceImage, 
    getValidMovesFunction, 
    pieceName
}) {
    const [isBoardHidden, setIsBoardHidden] = useState(false);
    const [isPieceHidden, setIsPieceHidden] = useState(false);
    const [showCoordinates, setShowCoordinates] = useState(false);
    const [isMicEnabled, setIsMicEnabled] = useState(false);
    const [PiecePosition, setPiecePosition] = useState([0, 0]);
    const [PieceColor, setPieceColor] = useState('white');
    const [currentChallenge,setCurrentChallenge]=useState(null);
    const [challengeList, setChallengeList] = useState(challenges(PiecePosition)[pieceName]);
    const [TargetPosition, setTargetPosition] = useState(null);
    const [shouldReinitiate, setShouldReinitiate] = useState(false);
    const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true);
    



    const currentChallenges = challenges(PiecePosition);

    const toggleSpeaker = () => {
        if (isSpeakerEnabled) {
            muteSpeech();
            muteMediaElements();
            setIsSpeakerEnabled(false);
        } else {
            unmuteMediaElements();
            setIsSpeakerEnabled(true);
        }
    };

    const customSpeak = useCallback((utterance) => {
        if (isSpeakerEnabled) {
            window.speechSynthesis.speak(utterance);
        }
    }, [isSpeakerEnabled]);

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
        setShowCoordinates(prevState => !prevState);
    }

    const handleTileClick = (x, y, source = 'click') => {
        const validMoves = getValidMovesFunction(PiecePosition);
        if (!isMicEnabled && source === 'voice') {
            return;
        }
       
        if (validMoves.some(move => move[0] === x && move[1] === y)) {
            setPiecePosition([x, y]);
            
            const rightMove = new SpeechSynthesisUtterance(`${pieceName} to ${convertToChessNotation([x,y])}`);
           
            customSpeak(rightMove);
        } else {
            
            const utterThis = new SpeechSynthesisUtterance('Invalid move.');
            
            customSpeak(utterThis);
        }

       
    }

    const startChallenge = useCallback((challengeId) => {
        let selectedChallenge = currentChallenges[pieceName].find(ch => ch.id === challengeId);

        
        if (selectedChallenge && selectedChallenge.start) {
            setPiecePosition([...selectedChallenge.start]);
        }

        
        if (selectedChallenge && selectedChallenge.end) {
            setTargetPosition([...selectedChallenge.end]);
        }

        setCurrentChallenge(selectedChallenge);
        if (selectedChallenge && selectedChallenge.description) {
            
            const utterThis = new SpeechSynthesisUtterance(selectedChallenge.description);
            customSpeak(utterThis);
        }

    }, [currentChallenges, pieceName, setPiecePosition, setTargetPosition, setCurrentChallenge, customSpeak]);

    useEffect(() => {
        if (currentChallenge && 
            PiecePosition[0] === currentChallenge.end[0] && 
            PiecePosition[1] === currentChallenge.end[1]) 
            
        {
            
            const utterThis = new SpeechSynthesisUtterance('Challenge Complete');
            customSpeak(utterThis);
            setCurrentChallenge(null);
            setTargetPosition(null);
            if (currentChallenge.reinitiate) {
                setShouldReinitiate(true);
            }
        }
    }, [PiecePosition, currentChallenge, customSpeak]);


    const handlePositionChange = (newPosition) => {
        setPiecePosition(newPosition);
    setChallengeList(challenges(newPosition)[pieceName]);
    }

    const selectPieceColor = (color) => {
        setPieceColor(color);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
   

    return( 
        <div className='container'>
    <div className="board-and-mic"> 
        <Board 
            whitePieceImage={whitePieceImage}
            blackPieceImage={blackPieceImage}
            pieceName={pieceName}
            PiecePosition={PiecePosition}
            handleTileClick={handleTileClick}
            isMicEnabled={isMicEnabled}
            isPieceHidden={isPieceHidden}
            showCoordinates={showCoordinates}
            PieceColor={PieceColor}
            TargetPosition={TargetPosition}
            isBoardHidden={isBoardHidden}
        />
        
    </div>
            <div className='controls' id='scrollbar1'>
            <MicToggle isMicEnabled={isMicEnabled} toggleMic={toggleMic} isSpeakerEnabled={isSpeakerEnabled} toggleSpeaker={toggleSpeaker} />

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
    <div className="control-container">
        <div className="control-label">Select Challenge</div>
            <div>
            {challengeList.map(challenge => (
                <button 
                    className='ButtonContainer'
                    key={challenge.id} 
                    onClick={() => startChallenge(challenge.id)}
                >
                    {challenge.id}
                </button>
            ))}
            </div>
        {currentChallenge && <p>{currentChallenge.description}</p>}
    </div>
     </div>
</div>
    );
}

export default Chessboard;
