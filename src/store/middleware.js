import * as actionTypes from '_actions'
import * as actions from '_actions'
import {getQuestions, getCallback, getAnswers} from '_reducer'

export const toggleMiddleware = toggleCallback => store => next => action => {
  if (action.type === actionTypes.TOGGLE) {
    toggleCallback()
  }

  return next(action)
}

export const nextQuestionMiddleware = store => next => action => {
  const result = next(action)

  if (action.type === actionTypes.NEXT) {
    const nextState = store.getState()
    const questions = getQuestions(nextState)
    const answers = getAnswers(nextState)
    if (questions.length === 0) {
      getCallback(nextState)(answers)
    } else {
      let question = questions[0]
      if (typeof question.default === 'function') {
        question = {
          ...question,
          default: question.default(answers)
        }
      }
      if (question.when === true ||
          (typeof question.when === 'function' && question.when(answers) === true)) {
        store.dispatch(actions.loadNextQuestion(questions[0]))
      } else {
        const answer = {name: question.name, value: undefined}
        store.dispatch(actions.next(answer))
      }
    }
  }

  return result
}
