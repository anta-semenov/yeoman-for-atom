import {connect} from 'react-redux'
import List from './List'
import * as actions from '_actions'
import * as fromReducer from '_reducer'

const mapStateToProps = state => ({
  items: fromReducer.getFilteredVariants(state),
  selectedItem: fromReducer.getSelectedVariant(state),
  questionType: fromReducer.getQuestionType(state),
  isWaiting: fromReducer.isWaiting(state)
})

const mapDispatchToProps = dispatch => ({
  onItemClick: item => {
    dispatch(actions.setSelected(item))
    dispatch(actions.next())
  },
  onItemCheckboxClick: item => dispatch(actions.check(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
