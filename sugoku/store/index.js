import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import boardReducer from './reducers/board'
import userReducer from './reducers/userData'

const rootReducer = combineReducers({
  board: boardReducer, 
  userData: userReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store