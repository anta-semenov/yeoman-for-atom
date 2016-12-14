import React from 'react'
import './App.less'
import Input from '_Input'
import List from '_List'

const App = () => (
  <atom-panel class='modal'>
    <div className='select-list'>
      <Input/>
      <List />
    </div>    
  </atom-panel>
)

export default App
