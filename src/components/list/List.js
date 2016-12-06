import React from 'react'
import './List.less'
import ListItem from '_ListItem'

const List = ({selectedItem, items, onMoveDown, onMoveUp, onEnter, onItemClick, onItemCheckboxClick}) => {
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 13:
        onEnter()
        break
      case 38:
        onMoveUp()
        break
      case 40:
        onMoveDown()
        break
    }
  }

  return (
    <ul onKeyDown={handleKeyDown} className='list-group'>
      {items.map((item, index) => (
        <ListItem
          key={index}
          {...item}
          onClick={() => onItemClick(item)}
          onCheckboxClick={() => onItemCheckboxClick(item)}
          isSelect={selectedItem.name === item.name}
        />
      ))}
    </ul>
  )
}

List.propTypes = {
  selectedItem: React.PropTypes.object.isRequired,
  items: React.PropTypes.object.isRequired,
  onMoveDown: React.PropTypes.func.isRequired,
  onMoveUp: React.PropTypes.func.isRequired,
  onEnter: React.PropTypes.func.isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  onCheckboxClick: React.PropTypes.func
}

export default List
