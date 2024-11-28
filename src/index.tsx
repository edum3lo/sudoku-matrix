import React from 'react';
import ReactDOM from 'react-dom';
import './index-app.css';
import {isGoodBoard, delay, cleanBoard, initialBoard, defaultColorBoard, boardIndexesToGray, randomBoards} from "./sudoku-essentials"
import type {BoardState} from "./sudoku-essentials"

class Board extends React.Component<any, BoardState> {

  fancyBorder(colIndex:number, rowIndex:number):string {
    const boardC = [...this.props.boardColor]
    return boardC[colIndex][rowIndex] === 0 ? 'solid 5px #f76363' : boardC[colIndex][rowIndex] === 1 ? 'solid 5px #5ced89' : 'solid 1px black'
  }

  render() {
    const renderInput = (colIndex:number, rowIndex:number, rowItem:any) => {
      return (
        <input
          key={`${colIndex}${rowIndex}`}
          className="cell"
          value={rowItem === 0 ? '' : rowItem}
          maxLength={1}
          type="text"
          onInput={(e:any) => {
            this.props.onInput(e.target.value, colIndex, rowIndex)
          }}
          style={{
            backgroundColor: boardIndexesToGray.some((val: number) => (val === Number(`${colIndex}${rowIndex}`) || val === Number(`${colIndex}${rowIndex}`)-1 || val === Number(`${colIndex}${rowIndex}`) - 2)) ? '#dbdbdb' : '#f7f7f7',
            border: this.fancyBorder(colIndex, rowIndex)
          }}
        />
      );
    };

    return (
      <div className="board-wrap">
        {this.props.boardValue
          .map((column: Array<Array<any>>, colIndex:number) => column
            .map((rowItem, rowIndex:number) => renderInput(colIndex, rowIndex, rowItem))
          )
        }
      </div>
    )
  }
}

class SudokuSolver extends React.Component<{}, BoardState> {
  constructor(props:object) {
    super(props)
    this.state = {
      boardValue: initialBoard,
      boardColor: defaultColorBoard,
      randomBoardCount: 0,
      isAnimating: false
    }
  }

  updateCell(value:any, column:number, row:number): void {
    let checkIn = 0
    if(!this.state.isAnimating) checkIn++;
    if(checkIn === 2) return;
    const copy = cleanBoard.map((e, i) => this.state.boardValue[i] );
    copy[column][row] = value === '' ? 0 : value;
    this.setState({boardValue: copy})
  }

  updateColor(code:number, col: number, row:number):void {
    const copyC = [...this.state.boardColor];
    copyC[col][row] = code;
    this.setState({boardColor: copyC})
  }

  async fancyResetColor(code:number, ms:number) {
    for (let i = 0; i < 9; i++) { 
      await delay(ms)
      for (let j = 0; j < 9; j++) {
        this.updateColor(code, i, j)
      }
    }
  }

  isValid(board:any, col:number, row:number, k:any):boolean {
      for (let i = 0; i < 9; i++) {
          const m = 3 * Math.floor(col / 3) + Math.floor(i / 3);
          const n = 3 * Math.floor(row / 3) + i % 3;
          if (board[col][i] === k || board[i][row] === k || board[m][n] === k) {
            return false;
          }
      }
      return true;
  }
 
  async sudokuSolver(data:any): Promise<any> {
    let checkIn = 0
    for (let i = 0; i < 9; i++) {
      if(!this.state.isAnimating) checkIn++;
      if(checkIn === 2) break;
      for (let j = 0; j < 9; j++) {
        if (data[i][j] === 0) {
          for (let k = 1; k <= 9; k++) {
            if (this.isValid(data, i, j, k)) {
              await delay(1)
              data[i][j] = `${k}`;
              this.updateCell(k, i, j);
              this.updateColor(1, i , j);
              if (await this.sudokuSolver(data)) {
                return true;
              } else {
                if(!this.state.isAnimating) break;
                data[i][j] = 0;
                this.updateCell(0, i, j);
                this.updateColor(2, i, j)
              }
            }
         }
         return false;
       }
     }
   }
   return true;
  }

  solveInput() {
    this.setState({isAnimating: true});
    const flashErr = () => {
      this.fancyResetColor(0, 0).then(res => {
        this.fancyResetColor(2, 20);
        this.setState({isAnimating: false})
      })
    }
    const mock = cleanBoard.map((e, i) => this.state.boardValue[i]);
    if(!isGoodBoard(mock)) return flashErr()

    const doneCall = (res:any) => {
      console.log(res)
      this.fancyResetColor(2, 100)
      this.setState({
        isAnimating: false
      })
    }
    this.sudokuSolver(mock).then(res => doneCall(res));
  }

  handleInput(value:any, column:number, row:number):void {
    if(this.state.isAnimating) return
    const regExp = /[1-9]/;
    if(!regExp.test(value) && (value !== '')) return;
    this.updateCell(Number(value), column, row);
  }

  cleanInput() {
    this.setState({isAnimating: false})
    setTimeout(()=> {
      cleanBoard.forEach((z, i) => z.forEach((x, j) => this.updateCell(0, i, j)))
    }, 100)
  }

  randomInput() {
    let count = this.state.randomBoardCount
    this.setState({
      isAnimating: false,
      randomBoardCount: count + 1 === 5 ? 0 : count + 1 
    })
    setTimeout(()=> {
      cleanBoard.forEach((z, i) => z.forEach((x, j) => this.updateCell( randomBoards[count][i][j], i, j)))
    }, 500)
  }

  render() {
    return (
      <div className="app-container">
        <Board boardColor={this.state.boardColor} boardValue={this.state.boardValue} onInput={(value:any, colIndex:number, rowIndex:number ) => this.handleInput(value, colIndex, rowIndex)}/>
        <div className="button-div">
          <button className="solve-button" onClick={() => !this.state.isAnimating && this.solveInput()} >sudoku matrix it!</button>
          <button className="tool-button" onClick={() => this.randomInput()} ><i className="fa-solid fa-shuffle"></i></button>
          <button className="tool-button" onClick={() => this.cleanInput()} ><i className="fa-solid fa-eraser"></i></button>
        </div>
      </div>
    )
  }
}
  
ReactDOM.render(
  <SudokuSolver />,
  document.getElementById('root')
);