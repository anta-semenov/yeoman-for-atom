import {combineReducers} from 'redux'
import questions, * as fromQuestions from './questions'

const reducer = combineReducers({
  questions
})

export default reducer

/*
* Selectors
*/
