export const getValidKnightMoves = (knightPosition) => {
    const [knightX, knightY] = knightPosition;
    const possibleMoves = [
        [knightX + 2, knightY + 1],
        [knightX + 2, knightY - 1],
        [knightX - 2, knightY + 1],
        [knightX - 2, knightY - 1],
        [knightX + 1, knightY + 2],
        [knightX + 1, knightY - 2],
        [knightX - 1, knightY + 2],
        [knightX - 1, knightY - 2],
    ];
    
    return possibleMoves.filter(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8);
}

  
export const getValidBishopMoves = (bishopPosition) => {
    const [bishopX, bishopY] = bishopPosition;
    let possibleMoves = [];

    //  top-right 
    for(let x = bishopX + 1, y = bishopY + 1; x < 8 && y < 8; x++, y++) {
        possibleMoves.push([x, y]);
    }
    
    // top-left 
    for(let x = bishopX - 1, y = bishopY + 1; x >= 0 && y < 8; x--, y++) {
        possibleMoves.push([x, y]);
    }
    
    //  bottom-right 
    for(let x = bishopX + 1, y = bishopY - 1; x < 8 && y >= 0; x++, y--) {
        possibleMoves.push([x, y]);
    }

    //  bottom-left 
    for(let x = bishopX - 1, y = bishopY - 1; x >= 0 && y >= 0; x--, y--) {
        possibleMoves.push([x, y]);
    }

    return possibleMoves;
}

export const getValidRookMoves = (rookPosition) => {
    const [rookX, rookY] = rookPosition;
    let possibleMoves = [];

    //  upwards 
    for(let y = rookY + 1; y < 8; y++) {
        possibleMoves.push([rookX, y]);
    }

    //  downwards 
    for(let y = rookY - 1; y >= 0; y--) {
        possibleMoves.push([rookX, y]);
    }

    //  left 
    for(let x = rookX - 1; x >= 0; x--) {
        possibleMoves.push([x, rookY]);
    }

    //  right 
    for(let x = rookX + 1; x < 8; x++) {
        possibleMoves.push([x, rookY]);
    }

    return possibleMoves;
}

export const getValidQueenMoves = (queenPosition) => {
    const [queenX, queenY] = queenPosition;
    let possibleMoves = [];

    // Diagonal moves 
    // Top-right
    for(let x = queenX + 1, y = queenY + 1; x < 8 && y < 8; x++, y++) {
        possibleMoves.push([x, y]);
    }
    
    // Top-left 
    for(let x = queenX - 1, y = queenY + 1; x >= 0 && y < 8; x--, y++) {
        possibleMoves.push([x, y]);
    }
    
    // Bottom-right 
    for(let x = queenX + 1, y = queenY - 1; x < 8 && y >= 0; x++, y--) {
        possibleMoves.push([x, y]);
    }

    // Bottom-left 
    for(let x = queenX - 1, y = queenY - 1; x >= 0 && y >= 0; x--, y--) {
        possibleMoves.push([x, y]);
    }

    // Straight moves 
    // Upwards 
    for(let y = queenY + 1; y < 8; y++) {
        possibleMoves.push([queenX, y]);
    }

    // Downwards 
    for(let y = queenY - 1; y >= 0; y--) {
        possibleMoves.push([queenX, y]);
    }

    // Left 
    for(let x = queenX - 1; x >= 0; x--) {
        possibleMoves.push([x, queenY]);
    }

    // Right 
    for(let x = queenX + 1; x < 8; x++) {
        possibleMoves.push([x, queenY]);
    }
    return possibleMoves;
}

