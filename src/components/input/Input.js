import React from 'react'
import './Input.less'

class Input extends React.Component {
  componentDidMount() {
    if (this._ref) {
      this._ref.focus()
      this._ref.onkeydown = event => this.onKeyDown(event)
    }
  }

  componentDidUpdate() {
    if (this._ref) {
      this._ref.focus()
    }
  }

  onKeyDown(event) {
    const {next, cancel, onMoveDown, onMoveUp, onChange, value} = this.props
    event.stopPropagation()
    switch (event.keyCode) {
      case 13:
        next()
        break
      case 27:
        cancel()
        break
      case 38:
        onMoveUp()
        break
      case 40:
        onMoveDown()
        break
      case 8:
        onChange(value.slice(0, -1))
        break
      default:
        if (event.key.length === 1) onChange(value + event.key)
    }
  }

  render() {
    const {value, onChange, placeholder, next, cancel, onMoveDown, onMoveUp} = this.props

    return (
      <input
        className='input-text native-key-bindings is-focused'
        type='text'
        placeholder={placeholder}
        value={value}
        ref={ref => {this._ref = ref}}
      />
    )
  }
}

// const Input = ({value, onChange, placeholder, next, cancel, onMoveDown, onMoveUp}) => {
//   const onKeyDown = e => {
//     switch (e.keyCode) {
//       case 13:
//         next()
//         break
//       case 27:
//         cancel()
//         break
//       case 38:
//         onMoveUp()
//         break
//       case 40:
//         onMoveDown()
//         break
//     }
//   }
//   return (
//     <input
//       class='input-text'
//       type='text'
//       placeholder={placeholder}
//       value={value}
//       onChange={e => onChange(e.target.value)}
//       onKeyDown={onKeyDown}
//     />
//   )
// }

Input.propTypes = {
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  next: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
}

export default Input
