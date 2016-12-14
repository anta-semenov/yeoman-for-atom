import {connect} from 'react-redux'
import List from './List'
import * as actions from '_actions'
import * as fromReducer from '_reducer'

const mapStateToProps = state => ({
  items: fromReducer.getFilteredVariants(state),
  selectedItem: fromReducer.getSelectedVariant(state)
})

const mapDispatchToProps = dispatch => ({
  onMoveDown: () => dispatch(actions.down()),
  onMoveUp: () => dispatch(actions.up()),
  onEnter: () => dispatch(actions.next()),
  onItemClick: item => dispatch(actions.next(item)),
  onItemCheckboxClick: item => dispatch(actions.check(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
