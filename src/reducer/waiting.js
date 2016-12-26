import * as actionTypes from '_actionTypes'

const waiting = (state = '', action) => {
  switch (action.type) {
    case actionTypes.WAITING:
      return action.message || 'Chill bro. Things are doing'
    default:
      return ''
  }
}

export default waiting

export const getWaitingMessage = state => state
export const isWaiting = state => state !== ''
