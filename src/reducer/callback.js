import * as actionTypes from '_actionTypes'

const callBack = (state = () => {}, action) => {
  switch (action.type) {
    case actionTypes.INIT_PROMPT:
      return action.cb
    default:
      return state
  }
}

export default callBack

export const getCallback = state => state
