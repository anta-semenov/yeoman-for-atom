import {connect} from 'react-redux'
import Waiting from './Waiting'
import * as actions from '_actions'
import * as fromReducer from '_reducer'

const mapStateToProps = state => ({
  message: fromReducer.getWaitingMessage(state)
})

export default connect(mapStateToProps)(Waiting)
