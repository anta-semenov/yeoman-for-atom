import {initPrompt, next} from '_actions'
import {dispatch} from '_configureStore'

const adapter = {
  prompt: (questions = [], cb) => {
    if (cb) {
      dispatch(initPrompt(questions, cb))
    } else {
      return new Promise(resolve => {
        dispatch(initPrompt(questions, resolve))
      })
    }
  },
  diff: () => {},
  log: () => {}
}

adapter.log.create = () => {}
adapter.log.force = () => {}
adapter.log.skip = () => {}
adapter.log.invoke = () => {}
adapter.log.conflict = () => {}
adapter.log.identical = () => {}
adapter.log.info = () => {}

export default adapter
