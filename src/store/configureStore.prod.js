import {createStore, applyMiddleware} from 'redux'
import rootReducer from '_reducer';
import thunk from 'redux-thunk'
import {toggleMiddleware, nextQuestionMiddleware} from './middleware'
import {loadGenerators} from '_actions'

const configureStore = (toggleCallback) => {
  const store = createStore(rootReducer, applyMiddleware(thunk, toggleMiddleware(toggleCallback), nextQuestionMiddleware))
  store.dispatch(loadGenerators())
  return store
}

export default configureStore
