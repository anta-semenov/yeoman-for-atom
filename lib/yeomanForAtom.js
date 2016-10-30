import YeomanForAtomView from './yeomanForAtomView'
import {CompositeDisposable} from 'atom'

class YeomanForAtom {
  activate(state) {
    this.yeomanView = new YeomanForAtomView(state)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.yeomanView.getElement(),
      visible: false
    })

    this.subscriptions = new CompositeDisposable

    this.subscriptions.add(atom.commands.add(
      'atom-workspace',
      'yeoman-for-atom:toogle',
      () => this.toogle()
    ))
  }

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.yeomanView.destroy()
  }

  serialaze() {
    return this.yeomanView.serialaze()
  }

  toogle() {
    if (this.modalPanel && this.modalPanel.isVisible()) {
      this.modalPanel.hide()
    } else {
      this.modalPanel.show()
    }
  }
}

const instance = new YeomanForAtom
export default instance
