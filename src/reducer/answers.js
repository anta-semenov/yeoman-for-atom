import * as actionTypes from '_actionTypes'

const answers = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.NEXT:
      return action.currentAnswer ? {...state, [action.currentAnswer.name]: action.currentAnswer.value} : state
    case actionTypes.TOGGLE:
      return {}
    default:
      return state
  }
}

export default answers

export const getAnswers = state => state
