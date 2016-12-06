import {connect} from 'react-redux'
import Input from './Input'
import actions from '_actions'
import * as fromReducer from '_reducer'

const mapStateToProps = state => ({
  value: fromReducer.getInputValue(state),
  placeholder: fromReducer.getInputPlaceHolder(state)
})

const mapDispatchToProps = dispatch => ({
  onChange: newValue => dispatch(actions.changeInput(newValue)),
  next: () => dispatch(actions.next()),
  cancel: () => dispatch(actions.toggle())
})

export default connect(mapStateToProps, mapDispatchToProps)(Input)
