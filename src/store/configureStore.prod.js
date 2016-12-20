import {createStore, applyMiddleware} from 'redux'
import rootReducer from '_reducer';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {toggleMiddleware, nextQuestionMiddleware} from './middleware'
import {loadGenerators} from '_actions'

export let dispatch

const configureStore = (toggleCallback) => {
  const store = createStore(rootReducer, applyMiddleware(thunk, toggleMiddleware(toggleCallback), nextQuestionMiddleware, createLogger()))
  dispatch = store.dispatch
  return store
}

export default configureStore
