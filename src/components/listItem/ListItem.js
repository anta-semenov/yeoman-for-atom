import React from 'react'
import {CHECKBOX} from '_questionTypes'
import './ListItem.less'

const ListItem = ({name, checked, onClick, isSelect, onCheckboxClick, questionType}) => (
  <li
    className={`list-item-layout ${isSelect ? 'selected' : ''}`}
    onClick={questionType === CHECKBOX ? () => {} : onClick}
  >
    {checked !== undefined && questionType === CHECKBOX &&
      <input
        type='checkbox'
        checked={checked}
        className='input-checkbox'
        onClick={onCheckboxClick}
      />
    }
    <div className={`${questionType === CHECKBOX ? 'list-item-title' : ''}`}>{name}</div>
  </li>
)

ListItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  isSelect: React.PropTypes.bool.isRequired,
  onCheckboxClick: React.PropTypes.func,
  questionType: React.PropTypes.string.isRequired
}

export default ListItem
