import * as actionTypes from '_actionTypes'

const answers = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.NEXT:
      return {...state, [action.currentAnswer.name]: action.currentAnswer.value}
    default:
      return state
  }
}

export default answers

export const getAnswers = state => state
