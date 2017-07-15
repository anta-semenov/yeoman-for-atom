/*global atom*/
import * as actionTypes from '_actionTypes'
import yeoman from 'yeoman-environment'
import adapter from '_yeomanAdapter'
import * as questionTypes from '_questionTypes'
import {getCurrentAnswer} from '_reducer'
import path from 'path'

let env
/*
* Simple actions
*/

export const changeInput = value => ({type: actionTypes.CHANGE_INPUT, value})
export const up = () => ({type: actionTypes.UP})
export const down = () => ({type: actionTypes.DOWN})
export const check = checkedIndex => ({type: actionTypes.CHECKED, checkedIndex})
export const setSelected = selectedVariant => ({type: actionTypes.SET_SELECTED, selectedVariant})

export const toggle = () => ({type: actionTypes.TOGGLE})
export const waiting = message => ({type: actionTypes.WAITING, message})
export const initPrompt = (questions, cb) => ({type: actionTypes.INIT_PROMPT, questions, cb})
export const loadNextQuestion = question => ({type: actionTypes.LOAD_NEXT_QUESTION, question})

/*
* Thunks
*/

export const loadGenerators = ({path: activePath, ...rest}) => dispatch => {
  env = yeoman.createEnv(undefined, undefined, adapter)
  env.lookup(() => {
    const generators = env.getGeneratorsMeta()
    const generatorsVariants = Object.keys(generators).map(key => {
      const generator = generators[key]
      return ({
        name: generator.namespace.replace(/:app$/, '').replace(':', ' '),
        value: () => {
          dispatch(waiting('Load generator'))
          const projectDirectory = atom.project.getPaths()[0]

          let file = ''
          let directory = activePath

          if (/\/[^/]+\.[^/.]+$/.test(activePath)) {
            file = activePath
            directory = path.dirname(activePath)
          }

          const atomOptions = JSON.stringify({
            file,
            directory,
            projectDirectory,
            ...rest
          })

          const options = {
            cwd: projectDirectory,
            force: true,
            atom: atomOptions
          }
          env.cwd = projectDirectory
          return new Promise(resolve => {
            env.run(generator.namespace, options, resolve)
          }).then(() => dispatch(toggle()), reject => {
            console.log('Error while running generator', reject);
            dispatch(toggle())
          })
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

export const next = () => (dispatch, getState) => {
  const currentAnswer = getCurrentAnswer(getState()) || {}
  if (typeof currentAnswer.value === 'function') {
    currentAnswer.value()
  } else {
    dispatch({type: actionTypes.NEXT, currentAnswer})
  }
}
