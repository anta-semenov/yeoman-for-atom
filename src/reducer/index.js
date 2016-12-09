import {combineReducers} from 'redux'
import questions, * as fromQuestions from './questions'
import answers, * as fromAnswers from './answers'
import callback, * as fromCallback from './callback'
import dialog, * as fromDialog from './dialog'

const reducer = combineReducers({
  questions,
  answers,
  callback,
  dialog
})

export default reducer

export const initialState = {
  questions: [],
  answers: {},
  dialog: {},
  callback: undefined
}

/*
* Selectors
*/
Object.keys(fromDialog).forEach(key => {
  module.exports[key] = state => fromDialog[key](state.dialog)
})

Object.keys(fromCallback).forEach(key => {
  module.exports[key] = state => fromCallback[key](state.callback)
})

Object.keys(fromAnswers).forEach(key => {
  module.exports[key] = state => fromAnswers[key](state.anwers)
})

Object.keys(fromQuestions).forEach(key => {
  module.exports[key] = state => fromQuestions[key](state.questions)
})
