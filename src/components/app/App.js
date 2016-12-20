import React from 'react'
import Input from '_Input'
import List from '_List'
import Message from '_Message'

const App = () => (
  <atom-panel class='modal'>
    <Message/>
    <div className='select-list'>
      <Input/>
      <List/>
    </div>
  </atom-panel>
)

export default App
