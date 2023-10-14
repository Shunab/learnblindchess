import React, { useRef } from "react";
import './PiecePositionSelector.css' 


export function PiecePositionSelector({ currentPosition, onPositionChange }) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
    const handleChange = () => {
      const x = letters.indexOf(xSelect.current.value);
      const y = parseInt(ySelect.current.value, 10);
      onPositionChange([x, y]);
    };
  
    const xSelect = useRef(null);
    const ySelect = useRef(null);
  
    return (
      <div className="dropdown-container">
        <select 
          className="dropdown"
          ref={xSelect} 
          defaultValue={letters[currentPosition[0]]} 
          onChange={handleChange}
        >
          {letters.map(letter => (
            <option key={letter} value={letter}>
              {letter}
            </option>
          ))}
        </select>
    
        <select 
          className="dropdown"
          ref={ySelect} 
          defaultValue={currentPosition[1]} 
          onChange={handleChange}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map(j => (
            <option key={j} value={j}>
              {j + 1}
            </option>
          ))}
        </select>
      </div>
    );
    
  }
  