import actionTypes from '_actionTypes'
import yeoman from 'yeoman-environment'

const env = yeoman.createEnv(undefined, undefined)
/*
* Simple actions
*/

export const changeInput = value => ({type: actionTypes.CHANGE_INPUT, value})

export const next = () => ({type: actionTypes.NEXT})
export const toggle = () => ({type: actionTypes.TOGGLE})

/*
* Thunks
*/

export const loadGenerators = () => dispatch => {
  env.lookup(() => {
    const generators = env.getGeneratorsMeta()
    console.log(env.run('react'));
    console.log(generators);
  })
}
