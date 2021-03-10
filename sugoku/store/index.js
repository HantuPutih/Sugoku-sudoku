import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import board from './reducers/board'

const rootReducer = combineReducers({
  board: board
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store