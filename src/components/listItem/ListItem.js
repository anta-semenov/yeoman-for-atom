import React from 'react'
import './ListItem.less'

const ListItem = ({name, checked, onClick, isSelect, onCheckboxClick}) => (
  <li className={`${isSelect ? 'selected' : ''}`} onClick={onClick}>
    {checked !== undefined &&
      <input type='checkbox' checked={checked} className='input-checkbox' onClick={onCheckboxClick}/>
    }
    {name}
  </li>
)

ListItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  isSelect: React.PropTypes.bool.isRequired,
  onCheckboxClick: React.PropTypes.func
}

export default ListItem
