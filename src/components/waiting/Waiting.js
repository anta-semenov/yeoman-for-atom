import React from 'react'
import './Waiting.less'

const Waiting = ({message}) => {
  if (message === '') return null

  return (
    <div className='waiting-container'>
      <span className='loading loading-spinner-tiny inline-block'/>
      <div>{message}</div>
    </div>
  )
}

Waiting.propTypes = {
  message: React.PropTypes.string
}

export default Waiting
