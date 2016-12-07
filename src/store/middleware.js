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
    if (questions.length === 0) {
      getCallback(nextState)(getAnswers(nextState))
    } else {
      actions.loadNextQuestion(questions[0])
    }
  }

  return result
}
