import {combineReducers} from 'redux'
import questions, * as fromQuestions from './questions'
import answers, * as fromAnswers from './answers'
import callback, * as fromCallback from './callback'
import dialog, * as fromDialog from './dialog'
import waiting, * as fromWaiting from './waiting'

const reducer = combineReducers({
  questions,
  answers,
  callback,
  dialog,
  waiting
})

export default reducer

/*
* Selectors
*/
Object.keys(fromDialog).forEach(key => {
  if (key === 'default') return
  module.exports[key] = state => fromDialog[key](state.dialog)
})

Object.keys(fromCallback).forEach(key => {
  if (key === 'default') return
  module.exports[key] = state => fromCallback[key](state.callback)
})

Object.keys(fromAnswers).forEach(key => {
  if (key === 'default') return
  module.exports[key] = state => fromAnswers[key](state.answers)
})

Object.keys(fromQuestions).forEach(key => {
  if (key === 'default') return
  module.exports[key] = state => fromQuestions[key](state.questions)
})

Object.keys(fromWaiting).forEach(key => {
  if (key === 'default') return
  module.exports[key] = state => fromWaiting[key](state.waiting)
})
