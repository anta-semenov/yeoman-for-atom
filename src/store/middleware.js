import * as actionTypes from '_actions'

export const toggleMiddleware = toggleCallback => store => next => action => {
  if (action.type === actionTypes.TOGGLE) {
    toogleCallback()
  }
  return next(action)
}
