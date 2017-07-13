/*global atom*/
require('./l10n.min')
import React from 'react'
import ReactDOM from 'react-dom'
import vm from 'vm'
import Root from './components/root/Root'
import configureStore from './store/configureStore'
import {CompositeDisposable} from 'atom'
import {loadGenerators} from '_actions'


let element
let subscriptions
let modalPanel
let dispatch
let originalFunction
let unsafeFunction
let originalEval
let unsafeEval

export const activate = state => {
  const store = configureStore(toggle)
  element = document.createElement('div')
  element.id = 'yeomanForAtomRoot'
  dispatch = store.dispatch
  ReactDOM.render(<Root store={store} />, element)

  originalFunction = global.Function
  unsafeFunction = (...args) => {
    const params = []
    const src = args[args.length - 1]
    args.forEach((arg, index) => {
      if (index === (args.length - 1)) return

      if (typeof arg === 'string') {
        const paramList = arg.split(/\s*,\s*/)
        params.push(...paramList)
      }
    })
    return vm.runInThisContext(`(function(${params.join(', ')}) {${src}})`)
  }

  originalEval = global.eval
  unsafeEval = source => vm.runInThisContext(source)

  modalPanel = atom.workspace.addModalPanel({
    item: element,
    visible: false
  })

  subscriptions = new CompositeDisposable()
  subscriptions.add(atom.commands.add(
    'atom-workspace',
    'yeoman-for-atom:toggle',
    () => {
      const activeTextEditor = atom.workspace.getActiveTextEditor()
      toggle(activeTextEditor ? activeTextEditor.getPath() : '')
    }
  ))
  subscriptions.add(atom.commands.add(
    'atom-workspace',
    'yeoman-for-atom:tree-view-context-menu',
    ({target}) => toggle(target.dataset.path)
  ))
}

export const deactivate = () => {
  modalPanel.destroy()
  subscriptions.dispose()
  element.remove()
}

export const serialaze = () => {}

export const toggle = path => {
  if (modalPanel && modalPanel.isVisible()) {
    modalPanel.hide()
    global.Function = originalFunction
    global.eval = originalEval
  } else {
    modalPanel.show()
    global.Function = unsafeFunction
    global.eval = unsafeEval
    dispatch(loadGenerators(path))
  }
}
