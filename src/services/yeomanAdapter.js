import {initPrompt} from '_actions'

const adapter = {
  prompt: (questions, cb) => {
    if (cb) {
      initPrompt(questions, cb)
    } else {
      return new Promise(resolve => initPrompt(questions, resolve))
    }
  },
  diff: () => {},
  log: () => {}
}

export default adapter
