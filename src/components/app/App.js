import React from 'react'
import Input from '_Input'
import List from '_List'
import Message from '_Message'
import Waiting from '_Waiting'

const App = () => (
  <atom-panel class='modal'>
    <Waiting/>
    <Message/>
    <div className='select-list'>
      <Input/>
      <List/>
    </div>
  </atom-panel>
)

export default App
