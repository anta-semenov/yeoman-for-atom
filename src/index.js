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

  modalPanel = atom.workspace.addModalPanel({
    item: element,
    visible: false
  })

  subscriptions = new CompositeDisposable()
  subscriptions.add(atom.commands.add(
    'atom-workspace',
    'yeoman-for-atom:toggle',
    () => toggle()
  ))
}

export const deactivate = () => {
  modalPanel.destroy()
  subscriptions.dispose()
  element.remove()
}

export const serialaze = () => {}

export const toggle = () => {
  if (modalPanel && modalPanel.isVisible()) {
    modalPanel.hide()
    global.Function = originalFunction
  } else {
    modalPanel.show()
    global.Function = unsafeFunction
    dispatch(loadGenerators())
  }
}
