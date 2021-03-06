import { createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from "./modules"

export default (initState = {}) => createStore(reducers, initState, composeWithDevTools())
