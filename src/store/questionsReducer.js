import {REQUEST_QUESTIONS, RECEIVE_QUESTIONS,
  REQUEST_QUESTION_UPDATE, RECEIVE_QUESTION_UPDATE,
  REQUEST_DELETE_QUESTION, CONFIRM_DELETE_QUESTION, REJECT_DELETE_QUESTION} from './questionsActions'
import initialState from './initialState'

const question = (
  state = initialState.question,
  action
) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return Object.assign({}, state, {
        data: action.item
      })
    case REQUEST_QUESTION_UPDATE:
      if (state.data._id === action.id) {
        return Object.assign({}, state, {
          isUpdating: true
        })
      } else {
        return state
      }
    case RECEIVE_QUESTION_UPDATE:
      if (state.data._id === action.id) {
        return Object.assign({}, state, {
          data: action.updatedQuestion,
          isUpdating: false
        })
      } else {
        return state
      }
    case REQUEST_DELETE_QUESTION:
      if (state.data._id === action.id) {
        return Object.assign({}, state, {
          isUpdating: true
        })
      } else {
        return state
      }
    case REJECT_DELETE_QUESTION:
      if (state.data._id === action.id) {
        return Object.assign({}, state, {
          isUpdating: false
        })
      } else {
        return state
      }
    default:
      return state
  }
}

const questions = (
  state = initialState.questions,
  action
) => {
  switch (action.type) {
    case REQUEST_QUESTIONS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_QUESTIONS:
      return {
        isFetching: false,
        items: action.items.map(i => question(undefined, {
          type: action.type,
          item: i
        }))
      }
    case REQUEST_QUESTION_UPDATE:
    case RECEIVE_QUESTION_UPDATE:
    case REQUEST_DELETE_QUESTION:
    case REJECT_DELETE_QUESTION:
      return Object.assign({}, state, {
        items: state.items.map(i => question(i, action))
      })
    case CONFIRM_DELETE_QUESTION:
      return Object.assign({}, state, {
        items: state.items.filter(i => i.data._id !== action.id)
      })
    default:
      return state
  }
}

export default questions
