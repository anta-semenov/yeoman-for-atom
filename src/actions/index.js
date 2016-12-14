import * as actionTypes from '_actionTypes'
import yeoman from 'yeoman-environment'
import adapter from '_yeomanAdapter'
import * as questionTypes from '_questionTypes'

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
    const generatorsVariants = Object.keys(generators).map(key => {
      const generator = generators[key]
      return ({
        name: generator.namespace.replace(/:app$/, '').replace(':', ' '),
        value: () => {
          //TODO get different options from atom: project folder, current file, etc
          env.run(generator.namespace)
        }
      })
    })

    const generatorsQuestion = {
      type: questionTypes.LIST,
      name: 'chooseGenerator',
      message: 'Choose the generator',
      choices: generatorsVariants.sort((a, b) => a.name > b.name ? 1 : -1),
      default: 0
    }

    dispatch(loadNextQuestion(generatorsQuestion))
  })
}

export const next = currentAnswer => dispatch => {
  if (typeof currentAnswer.value === 'function') {
    currentAnswer.value()
  } else {
    dispatch({type: actionTypes.NEXT, currentAnswer})
  }
}
