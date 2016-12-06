/*global atom*/
require('./l10n.min')
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root/Root'
import configureStore from './store/configureStore'
import {CompositeDisposable} from 'atom'

let element
let subscriptions
let modalPanel

export const activate = state => {
  const store = configureStore(toggle)
  element = document.createElement('div')
  element.id = 'yeomanForAtomRoot'
  ReactDOM.render(<Root store={store} />, element)

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
  } else {
    modalPanel.show()
  }
}
