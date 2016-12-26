import React from 'react'
import ListItem from '_ListItem'

const List = ({selectedItem, items, onItemClick, onItemCheckboxClick, questionType, isWaiting}) => {
  if (!items || isWaiting) return null

  return (
    <ol className='list-group'>
      {items.map((item, index) => (
        <ListItem
          key={index}
          {...item}
          onClick={() => onItemClick(item)}
          onCheckboxClick={() => onItemCheckboxClick(index)}
          isSelect={selectedItem.name === item.name}
          questionType={questionType}
        />
      ))}
    </ol>
  )
}

List.propTypes = {
  selectedItem: React.PropTypes.object.isRequired,
  items: React.PropTypes.object.isRequired,
  questionType: React.PropTypes.string.isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  onItemCheckboxClick: React.PropTypes.func,
  isWaiting: React.PropTypes.bool
}

export default List
