import {connect} from 'react-redux'
import Message from './Message'
import * as fromReducer from '_reducer'

const mapStateToProps = state => ({
  message: fromReducer.getDialogMessage(state)
})

export default connect(mapStateToProps)(Message)
