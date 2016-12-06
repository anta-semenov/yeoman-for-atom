import React from 'react'
import './Input.less'

const Input = ({value, onChange, placeholder, next, cancel}) => {
  const onKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        next()
        break;
      case 27:
        cancel()
    }
  }
  return (
    <input
      class='input-text'
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
    />
  )
}

Input.propTypes = {
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  next: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
}

export default Input
