import { Alert } from 'react-native';

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

export function solveBoard(initialBoard) {
  return dispatch => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({board: initialBoard}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response.solution)
        dispatch(setGameBoard(response.solution))
      })
      .catch(console.warn)
  }
}

export function validateBoard(userBoard, navigation) {
  return dispatch => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board: userBoard}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response.status);
        if (response.status !== 'solved') {
          Alert.alert(
            response.status,
            'Check your board and try again!',
          )
        } else {
          navigation.navigate('Result')
        }
      }
      )
      .catch(console.warn)
  }
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');


// user
export const setUsername = (payload) => ({
  type: 'USER_DATA/SET_USERNAME',
  payload
})

export const setDifficulty = (payload) => ({
  type: 'USER_DATA/SET_DIFFICULTY',
  payload
})
