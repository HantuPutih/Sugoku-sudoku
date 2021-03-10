export const setGameBoard = (payload) => ({
  type: 'GAME_BOARD/SET_GAME_BOARD',
  payload
})

export const setInitialBoard = (payload) => ({
  type: 'INITIAL_BOARD/SET_INITIAL_BOARD_BOARD',
  payload
})


export function fetchBoard(difficulty) {
  return dispatch => {
    fetch('https://sugoku.herokuapp.com/board?difficulty=' + difficulty )
    .then((res) => res.json() )
    .then((data) => {
      // let convertBoard = JSON.parse(JSON.stringify(data.board))
      dispatch(setGameBoard(data.board))
      dispatch(setInitialBoard(data.board.map(row => [...row])))
    })
  }
}
