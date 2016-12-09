import {connect} from 'react-redux'
import Input from './Input'
import actions from '_actions'
import * as fromReducer from '_reducer'

const mapStateToProps = state => ({
  value: fromReducer.getInput(state),
  placeholder: fromReducer.getInputPlaceholder(state),
  currentAnswer: fromReducer.getCurrentAnswer(state)
})

const mapDispatchToProps = dispatch => ({
  onChange: newValue => dispatch(actions.changeInput(newValue)),
  next: answer => dispatch(actions.next(answer)),
  cancel: () => dispatch(actions.toggle())
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  value: stateProps.value,
  placeholder: stateProps.placeholder,
  ...dispatchProps,
  next: () => dispatchProps.next(stateProps.currentAnswer)
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Input)
