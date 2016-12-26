/*global atom*/
import React from 'react'

class Input extends React.Component {
  state = {shouldInitRef: true}

  componentDidMount() {
    this.initInput(this._ref)
  }

  initInput(ref) {
    if (ref) {
      ref.focus()
      if (this.state.shouldInitRef) {
        const {next, cancel, onMoveDown, onMoveUp, onChange, placeholder} = this.props

        ref.getModel().placeholderText = placeholder
        const buffer = ref.getModel().getBuffer()
        buffer.onDidChange(() => onChange(buffer.getText()))
        atom.commands.add(ref, 'core:move-up', onMoveUp)
        atom.commands.add(ref, 'core:move-down', onMoveDown)
        atom.commands.add(ref, 'core:cancel', cancel)
        atom.commands.add(ref, 'core:confirm', next)
      }
    }
  }

  componentDidUpdate() {
    this.initInput(this._ref)
  }

  componentWillReceiveProps({value, isWaiting}) {
    if (value === '' && value !== this.props.value && this._ref) {
      this._ref.getModel().getBuffer().setText('')
    }
    this.setState({shouldInitRef: isWaiting !== this.props.isWaiting})
  }

  render() {
    const {isWaiting} = this.props
    if (isWaiting) return null

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
  onMoveUp: React.PropTypes.func.isRequired,
  isWaiting: React.PropTypes.bool
}

export default Input
