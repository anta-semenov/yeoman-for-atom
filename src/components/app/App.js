import React from 'react'
import Input from '_Input'
import List from '_List'
import Message from '_Message'

const App = () => (
  <atom-panel class='modal'>
    <div className='select-list'>
      <Message/>
      <Input/>
      <List />
    </div>
  </atom-panel>
)

export default App
