import { combineReducers } from 'redux'
import data from './data'
import step from './step'
import order from './order'

export default combineReducers({
  data,
  step,
  order
})
