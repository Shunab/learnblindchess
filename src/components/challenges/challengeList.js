export function convertToChessNotation([x, y]) {
    const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return `${files[x]}${y + 1}`;
}

const getTileColor = (x, y) => {
    return (x + y) % 2 === 0 ? 'white' : 'black';
};

const calculateRandomEnd = () => {
    const x = Math.floor(Math.random()*8)
    const y = Math.floor(Math.random()*8)
    return([x,y]);
}


const calculateRandomBishopEnd = (PiecePosition) => {
    const [startX, startY] = PiecePosition;
    const startColor = getTileColor(startX, startY);

    let possibleEndPositions = [];

    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (getTileColor(x, y) === startColor && (x !== startX || y !== startY)) {
                possibleEndPositions.push([x, y]);
            }
        }
    }

    const randomIndex = Math.floor(Math.random() * possibleEndPositions.length);
    return possibleEndPositions[randomIndex];
};

const validDiagonal = (PiecePosition, number) => {
    const [pieceX, pieceY] = PiecePosition;
    const diagonalTiles = [
        [pieceX - number, pieceY + number],
        [pieceX - number, pieceY - number],
        [pieceX + number, pieceY + number],
        [pieceX + number, pieceY - number]
    ];
    const validDiagonalMoves = diagonalTiles.filter(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8);
    const randomIndex = Math.floor(Math.random() * validDiagonalMoves.length);
    return validDiagonalMoves[randomIndex];
}


const validAdjacentMove = (PiecePosition, number) => {
    const [pieceX, pieceY] = PiecePosition;
    const adjacentTiles = [
        [pieceX ,pieceY + number],
        [pieceX ,pieceY - number],
        [pieceX + number ,pieceY],
        [pieceX - number ,pieceY]
    ];

    const validAdjacentMoves = adjacentTiles.filter(([x,y])=> x >= 0 && x < 8 && y>= 0 && y <8);
    const randomIndex = Math.floor(Math.random()* validAdjacentMoves.length);
    return validAdjacentMoves[randomIndex]

}

const cornerToCorner = [
    {start: [0, 0], end: [7, 7]},
    {start: [0, 7], end: [7, 0]},
    {start: [7, 0], end: [0, 7]},
    {start: [7, 7], end: [0, 0]},
];

const getRandomCornerChallenge = () => {
    const randomIndex = Math.floor(Math.random()*cornerToCorner.length);
    return cornerToCorner[randomIndex];
}



export const challenges = (PiecePosition) => {
    const selectedCornerChallenge = getRandomCornerChallenge();
    const adjacent1 = validAdjacentMove(PiecePosition,1);
    const adjacent2 = validAdjacentMove(PiecePosition,2);
    const adjacent4 = validAdjacentMove(PiecePosition,4);
    const randomEnd = calculateRandomEnd();
    const diagonal1 = validDiagonal(PiecePosition, 1);
    const diagonal2 = validDiagonal(PiecePosition, 2);
    const diagonal3 = validDiagonal(PiecePosition, 3);
    const randomBishopEnd = calculateRandomBishopEnd(PiecePosition);

    return {
        knight: [
            {
                id: 1,
                description: `Move the knight from ${convertToChessNotation(selectedCornerChallenge.start)} to ${convertToChessNotation(selectedCornerChallenge.end)}.`,
                start: selectedCornerChallenge.start,
                end: selectedCornerChallenge.end,
                reinitiate: true 
            },
            {
                id: 2,
                description: `Move the knight from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(diagonal1)}`,
                start: PiecePosition,
                end: diagonal1,
                reinitiate: true 
            },
            {
                id: 3,
                description: `Move the knight from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(adjacent1)}`,
                start: PiecePosition,
                end: adjacent1,
                reinitiate: true 
            },
            {
                id: 4,
                description: `Move the knight from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(randomEnd)}.`,
                start: PiecePosition,
                end: randomEnd,
                reinitiate: true 
            },
        ],
        queen: [
            {
                id: 1,
                description: "Move the queen from E4 to A8.",
                start: [4, 3],
                end: [0, 7],
                reinitiate: true 
            },
            {
                id: 2,
                description: `Move the queen from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(randomEnd)}.`,
                start: PiecePosition,
                end: randomEnd,
                reinitiate: true 
            },
            {
                id: 3,
                description: `Move the queen from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(randomEnd)}.`,
                start: PiecePosition,
                end: randomEnd,
                reinitiate: true 
            },
            {
                id: 4,
                description: `Move the queen from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(randomEnd)}.`,
                start: PiecePosition,
                end: randomEnd,
                reinitiate: true 
            },
        ],
        rook: [
            {
                id: 1,
                description: `Move the rook from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(diagonal1)}`,
                start: PiecePosition,
                end: diagonal1,
                reinitiate: true 
            },
            {
                id: 2,
                description: `Move the rook from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(diagonal2)}`,
                start: PiecePosition,
                end: diagonal2,
                reinitiate: true 
            },
            {
                id: 3,
                description: `Move the rook from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(diagonal3)}`,
                start: PiecePosition,
                end: diagonal3,
                reinitiate: true 
            },
            {
                id: 4,
                description: `Move the rook from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(randomEnd)}.`,
                start: PiecePosition,
                end: randomEnd,
                reinitiate: true 
            },
        ],
        bishop: [
            {
                id: 1,
                description: `Move the bishop from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(adjacent2)}`,
                start: PiecePosition,
                end: adjacent2,
                reinitiate: true 
            },
            {
                id: 2,
                description: `Move the bishop from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(adjacent4)}`,
                start: PiecePosition,
                end: adjacent4,
                reinitiate: true 
            },
            {
                id: 3,
                description: `Move the bishop from ${convertToChessNotation(PiecePosition)} to ${convertToChessNotation(randomEnd)}`,
                start: PiecePosition,
                end: randomBishopEnd,
                reinitiate: true 
            },
            {
                id: 4,
                description: `Move the bishop from  ${convertToChessNotation(PiecePosition)} to`,
                start: [4, 3],
                end: [0, 7],
                reinitiate: true 
            },
        ],
    };
    
}