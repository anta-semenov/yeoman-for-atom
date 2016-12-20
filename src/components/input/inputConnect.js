import {connect} from 'react-redux'
import Input from './Input'
import * as actions from '_actions'
import * as fromReducer from '_reducer'

const mapStateToProps = state => ({
  value: fromReducer.getInput(state),
  placeholder: fromReducer.getInputPlaceholder(state)
})

const mapDispatchToProps = dispatch => ({
  onChange: newValue => dispatch(actions.changeInput(newValue)),
  next: () => dispatch(actions.next()),
  cancel: () => dispatch(actions.toggle()),
  onMoveDown: () => dispatch(actions.down()),
  onMoveUp: () => dispatch(actions.up())
})

export default connect(mapStateToProps, mapDispatchToProps)(Input)
