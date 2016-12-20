import { createSelector } from 'reselect'
import * as actionTypes from '_actionTypes'
import * as questionTypes from '_questionTypes'

const dialog = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_NEXT_QUESTION:
      return loadQuestion(action.question)
    case actionTypes.INIT_PROMPT:
      return loadQuestion(action.questions[0])
    case actionTypes.CHANGE_INPUT:
      return onInputChange(state, action.value)
    case actionTypes.UP:
      return nextVariant(state)
    case actionTypes.DOWN:
      return previousVariant(state)
    case actionTypes.CHECKED:
      return check(state, action)
    case actionTypes.SET_SELECTED:
      return {...state, selectedVariant: action.selectedVariant}
    case actionTypes.TOGGLE:
      return {}
    default:
      return state
  }
}

export default dialog

/*
 Selectors
*/
export const getCurrentAnswer = state => {
  const {input, variants, name, questionType, placeholder} = state
  let value
  switch (questionType) {
    case questionTypes.INPUT:
      value = input || placeholder
      break
    case questionTypes.LIST:
      value = variants[getSelectedVariantIndex(state)].value
      break
    case questionTypes.CHECKBOX:
      value = variants.filter(item => item.checked).map(item => item.value)
  }

  return {name, value}
}

export const getSelectedVariant = state => state.selectedVariant
export const getVariants = state => state.variants
export const getDialogMessage = state => state.message
export const getInput = state => state.input
export const getInputPlaceholder = state => state.placeholder
export const getQuestionType = state => state.questionType
export const getFilteredVariants = createSelector(
  state => state,
  ({variants = [], input}) => variants.filter(item => input === '' || item.name.toLowerCase().indexOf(input.toLowerCase()) !== -1)
)

const getSelectedVariantIndex = state => {
  const variant = getSelectedVariant(state)
  const variants = getFilteredVariants(state)
  const index = variants.findIndex(item => item === variant)
  return Math.max(index, 0)
}

/*
 Utils
*/

const loadQuestion = ({type, name, message, choices, default: defaultValue}) => {
  let variants = choices || []
  if (type === questionTypes.CHECKBOX && Array.isArray(defaultValue)) {
    variants = variants.map(item => ({
      ...item,
      checked: defaultValue.find(value => item.value === value) !== undefined
    }))
  }

  return ({
    questionType: type,
    name,
    message,
    variants,
    input: '',
    selectedVariant: type === questionTypes.LIST && defaultValue ? variants[defaultValue] : variants[0],
    placeholder: type === questionTypes.INPUT ? defaultValue : 'you can filter variants here'
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

const nextVariant = state => {
  const nextState = {...state}
  const variants = getFilteredVariants(state)
  const selectedIndex = getSelectedVariantIndex(state)

  nextState.selectedVariant = selectedIndex === 0 ? variants[variants.length - 1] : variants[selectedIndex - 1]
  return nextState
}

const previousVariant = state => {
  const nextState = {...state}
  const variants = getFilteredVariants(state)
  const selectedIndex = getSelectedVariantIndex(state)

  nextState.selectedVariant = selectedIndex === (variants.length - 1) ? variants[0] : variants[selectedIndex + 1]
  return nextState
}

const onInputChange = (state, newInput) => {
  const newState = {...state, input: newInput}

  if (state.questionType !== questionTypes.INPUT) {
    const selectedVariant = getFilteredVariants(newState)[getSelectedVariantIndex(newState)]
    newState.selectedVariant = selectedVariant
  }

  return newState
}
