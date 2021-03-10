const initialState = {
  gameBoard: [],
  initialBoard: []
}

export default function board(state = initialState, { type, payload }) {
  switch (type) {
  case 'GAME_BOARD/SET_GAME_BOARD':
    return { ...state, gameBoard: payload }
  case 'INITIAL_BOARD/SET_INITIAL_BOARD_BOARD':
    return { ...state, initialBoard: payload }
  default:
    return state
  }
}
