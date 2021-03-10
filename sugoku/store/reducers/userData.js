const initialState = {
  username: '',
  difficulty: 'random'
}

export default function userReducer (state = initialState, { type, payload }) {
  switch (type) {

  case 'USER_DATA/SET_USERNAME':
    return { ...state, username: payload }
  case 'USER_DATA/SET_DIFFICULTY':
    return { ...state, difficulty: payload }
  
  default:
    return state
  }
}
