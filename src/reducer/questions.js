import * as actionTypes from '_actionTypes'

const questions = (state = [], action) => {
  switch (action.type) {
    case actionTypes.INIT_PROMPT:
      return action.questions
    case actionTypes.NEXT:
      return state.slice(1)
    case actionTypes.TOGGLE:
      return []
    default:
      return state
  }
}

export default questions

export const getQuestions = state => state
