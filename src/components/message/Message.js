import React from 'react'

const Message = ({message, isWaiting}) => {
  if (isWaiting) return null
  return (
    <label>
      {message}
    </label>
  )
}

Message.propTypes = {
  message: React.PropTypes.string.isRequired,
  isWaiting: React.PropTypes.bool
}

export default Message
