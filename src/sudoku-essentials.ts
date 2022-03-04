function isGoodBoard(board:any) {
  return boxesGood(board) && columnsGood(board) && rowsGood(board)
}

function rowsGood(board:any){
  for (let i = 0; i < 9; i++){
      let cur:any = []
      for (let j = 0; j < 9; j++){
          if (cur.includes(board[i][j])){
              return false
          }
          else if (board[i][j] !== 0){
              cur.push(board[i][j])
          }
      }
  }
  return true
}

function columnsGood(board:any){
  for (let i = 0; i < 9; i++){
      let cur:any = []
      for (let j = 0; j < 9; j++){
          if (cur.includes(board[j][i])){
              return false
          }
          else if (board[j][i] !== 0){
              cur.push(board[j][i])
          }
      }
  }
  return true
}


function boxesGood(board:any){
  const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                          [1, 0], [1, 1], [1, 2],
                          [2, 0], [2, 1], [2, 2]]
  for (let y = 0; y < 9; y += 3){
      for (let x = 0; x < 9; x += 3){
          let cur:any = []
          for (let i = 0; i < 9; i++){
              let coordinates = [...boxCoordinates[i]]
              coordinates[0] += y
              coordinates[1] += x
              if (cur.includes(board[coordinates[0]][coordinates[1]])){
                  return false
              }
              else if (board[coordinates[0]][coordinates[1]] !== 0){
                  cur.push(board[coordinates[0]][coordinates[1]])
              }
          }
      }
  }
  return true
}

const delay = (ms:number) => new Promise((resolve, reject) => setTimeout(resolve, ms));

// ____NON-FUNCTION ELEMENTS____ //

const cleanBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const initialBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const randomBoards = [
    [
        [0, 0, 8, 0, 0, 0, 0, 0, 7],
        [0, 0, 0, 7, 0, 6, 0, 0, 8],
        [0, 0, 0, 5, 0, 3, 0, 0, 0],
        [5, 1, 9, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 3, 0, 0],
        [0, 0, 0, 0, 0, 7, 6, 0, 4],
        [0, 0, 0, 0, 2, 5, 0, 1, 0],
        [6, 4, 0, 0, 0, 0, 0, 0, 0],
        [8, 0, 2, 0, 0, 0, 7, 0, 0],
    ],
    [
        [0, 0, 0, 9, 0, 0, 0, 0, 0],
        [7, 1, 0, 0, 0, 0, 0, 9, 0],
        [0, 0, 0, 0, 0, 5, 1, 7, 0],
        [3, 8, 2, 0, 0, 4, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 6, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 0],
        [8, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 4, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 7, 5, 0, 3, 0, 0, 0],
    ],
    [
        [8, 0, 5, 1, 0, 7, 6, 4, 0],
        [0, 1, 0, 3, 0, 0, 8, 5, 9],
        [0, 0, 0, 0, 8, 0, 0, 0, 0],
        [0, 7, 4, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 6, 0, 0, 0, 0, 0, 8, 4],
        [0, 4, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 8, 0, 0, 9, 7, 0, 6],
    ],
    [
        [8, 2, 5, 1, 0, 0, 0, 0, 6],
        [0, 3, 9, 6, 8, 5, 0, 0, 0],
        [6, 1, 7, 0, 0, 2, 9, 0, 8],
        [0, 0, 0, 0, 0, 0, 2, 7, 4],
        [0, 0, 0, 0, 6, 0, 0, 0, 0],
        [0, 0, 0, 9, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 5, 0, 0, 0, 0],
        [9, 0, 0, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 7],
    ],
    [
        [8, 0, 5, 0, 0, 0, 0, 4, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2],
        [6, 0, 0, 3, 0, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 6, 0, 0, 0],
        [0, 9, 0, 0, 0, 3, 0, 7, 0],
        [0, 0, 0, 0, 1, 0, 8, 6, 3],
        [0, 0, 0, 0, 0, 0, 4, 0, 9],
        [0, 5, 0, 0, 0, 0, 6, 2, 0],
        [9, 0, 2, 0, 6, 0, 0, 0, 0],
    ]
]

const defaultColorBoard = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
]

const boardIndexesToGray:any = [3,13,23,30,40,50,63,73,83,36,46,56];

// ____TYPES ELEMENTS____ //

interface BoardState {
    boardValue: Array<Array<any>>,
    [key: string | number]: any
  }

export { isGoodBoard, delay, cleanBoard, initialBoard, defaultColorBoard, boardIndexesToGray, randomBoards }
export type { BoardState }
