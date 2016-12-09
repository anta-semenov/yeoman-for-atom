import * as actionTypes from '_actionTypes'
import * as questionTypes from '_questionTypes'

const dialog = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_NEXT_QUESTION:
      return loadQuestion(action)
    case actionTypes.CHANGE_INPUT:
      return {...state, input: action.value}
    case actionTypes.UP:
      return {...state, selectedVariant: state.selectedVariant === 0 ? state.choices.length - 1 : state.selectedVariant - 1}
    case actionTypes.DOWN:
      return {...state, selectedVariant: state.selectedVariant === (state.choices.length - 1) ? 0 : state.selectedVariant + 1}
    case actionTypes.CHECKED:
      return check(state, action)
    default:
      return state
  }
}

export default dialog

/*
 Selectors
*/
export const getCurrentAnswer = ({input, variants, selectedVariant, name, questionType, placeholder}) => {
  let value
  switch (questionType) {
    case questionTypes.INPUT:
      value = input || placeholder
      break
    case questionTypes.LIST:
      value = variants[selectedVariant]
      break
    case questionTypes.CHECKBOX:
      value = variants.filter(item => item.checked)
  }

  return {name, value}
}

export const getSelectedVariant = state => state.selectedVariant
export const getVariants = state => state.variants
export const getDialogMessage = state => state.message
export const getInput = state => state.input
export const getFilteredVariants = ({variants, input}) => variants.filter(item => item.name === input)
export const getInputPlaceholder = state => state.placeholder

/*
 Utils
*/

const loadQuestion = ({question: {type, name, message, choices, default: defaultValue}}) => {
  let variants = choices || []
  if (type === questionTypes.CHECKBOX && (Array.isArray(defaultValue) || typeof defaultValue === 'number')) {
    const indexies = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    variants = variants.map((item, index) => ({
      ...item,
      checked: indexies.find(item => item === index) !== undefined
    }))
  }

  return ({
    questionType: type,
    name,
    message,
    variants,
    input: '',
    selectedVariant: type === questionTypes.LIST && defaultValue ? defaultValue : 0,
    placeholder: type === questionTypes.INPUT && defaultValue ? defaultValue : 'you can filter variants here'
  })
}

const check = (state, {checkedIndex}) => {
  const variants = state.variants.map((item, index) => {
    if (index === checkedIndex) {
      return {...item, checked: !item.checked}
    }
    return item
  })
  return {...state, variants}
}
