/*global atom*/
import React from 'react'

class Input extends React.Component {
  componentDidMount() {
    const ref = this._ref
    if (ref) {
      const {next, cancel, onMoveDown, onMoveUp, onChange, placeholder} = this.props
      ref.focus()
      ref.getModel().placeholderText = placeholder
      const buffer = ref.getModel().getBuffer()
      buffer.onDidChange(() => onChange(buffer.getText()))
      atom.commands.add(ref, 'core:move-up', onMoveUp)
      atom.commands.add(ref, 'core:move-down', onMoveDown)
      atom.commands.add(ref, 'core:cancel', cancel)
      atom.commands.add(ref, 'core:confirm', next)
    }
  }

  componentDidUpdate() {
    if (this._ref) {
      this._ref.focus()
    }
  }

  componentWillReceiveProps({value}) {
    if (value === '' && value !== this.props.value && this._ref) {
      this._ref.getModel().getBuffer().setText('')
    }
  }

  render() {
    const {value, onChange, placeholder, next, cancel, onMoveDown, onMoveUp} = this.props

    return (
      <atom-text-editor
        mini
        ref={ref => {this._ref = ref}}
      />
    )
  }
}

Input.propTypes = {
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  next: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired,
  onMoveDown: React.PropTypes.func.isRequired,
  onMoveUp: React.PropTypes.func.isRequired
}

export default Input
