import actionTypes from '_actionTypes'
import yeoman from 'yeoman-environment'
import adapter from '_yeomanAdapter'

const env = yeoman.createEnv(undefined, undefined, adapter)
/*
* Simple actions
*/

export const changeInput = value => ({type: actionTypes.CHANGE_INPUT, value})
export const up = () => ({type: actionTypes.UP})
export const down = () => ({type: actionTypes.DOWN})
export const check = checkedIndex => ({type: actionTypes.CHECKED, checkedIndex})

export const toggle = () => ({type: actionTypes.TOGGLE})
export const initPrompt = (questions, cb) => ({type: actionTypes.INIT_PROMPT, questions, cb})
export const loadNextQuestion = question => ({type: actionTypes.LOAD_NEXT_QUESTION, question})

/*
* Thunks
*/

export const loadGenerators = () => dispatch => {
  env.lookup(() => {
    const generators = env.getGeneratorsMeta()
    console.log(generators);
    dispatch()
  })
}

export const next = currentAnswer => dispatch => {
  if (typeof currentAnswer.value === 'function') {
    currentAnswer.value()
  } else {
    dispatch({type: actionTypes.NEXT, currentAnswer})
  }
}
