import React from 'react'

const Message = ({message}) => (
  <label>
    {message}
  </label>
)

Message.propTypes = {
  message: React.PropTypes.string.isRequired
}

export default Message
