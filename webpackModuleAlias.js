var path = require('path')

module.exports = {
  '_styleVariables.less': path.resolve('./src/constants/styleVariables.less'),
  '_reducer': path.resolve('./src/reducer'),
  '_actions': path.resolve('./src/actions'),
  '_actionTypes': path.resolve('./src/constants/actionTypes.js'),
  _Input: path.resolve('./src/components/input/inputConnect.js'),
  _List: path.resolve('./src/components/list/listConnect.js'),
  _ListItem: path.resolve('./src/components/listItem/ListItem.js'),
  _yeomanAdapter: path.resolve('./src/services/yeomanAdapter.js'),
  _questionTypes: path.resolve('./src/constants/questionTypes.js')
}
