import 'whatwg-fetch'

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const REQUEST_QUESTION_UPDATE = 'REQUEST_QUESTION_UPDATE'
export const RECEIVE_QUESTION_UPDATE = 'RECEIVE_QUESTION_UPDATE'

import {flashMessage} from './flashActions'
import {logOut} from './authActions'

const requestQuestions = () => {
  return {
    type: REQUEST_QUESTIONS
  }
}

const receiveQuestions = (
  items
) => {
  return {
    type: RECEIVE_QUESTIONS,
    items
  }
}

export const fetchQuestions = () => {
  return (dispatch, getState) => {
    dispatch(requestQuestions())

    fetch(`${ANTIVAX_ADMIN_SERVER_URL}/questions/`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getState().auth.token
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logOut())
          dispatch(flashMessage('Authorization failed. Please, log in again', 'error'))
          throw new Error('Unauthorized action')
        } else {
          return response
        }
      })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(receiveQuestions(json.data.questions))
        } else {
          dispatch(flashMessage(json.message))
        }
      })
      .catch(err => {
        throw err
      })
  }
}

const requestUpdate = (id) => {
  return {
    type: REQUEST_QUESTION_UPDATE,
    id
  }
}

const receiveUpdate = (
  id,
  updatedQuestion
) => {
  return {
    type: RECEIVE_QUESTION_UPDATE,
    id,
    updatedQuestion
  }
}

export const updateQuestion = (
  id,
  data
) => {
  return (dispatch, getState) => {
    dispatch(requestUpdate(id))

    fetch(`${ANTIVAX_ADMIN_SERVER_URL}/questions/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getState().auth.token
      },
      body: JSON.stringify({
        question: data
      })
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logOut())
          dispatch(flashMessage('Authorization failed. Please, log in again', 'error'))
          throw new Error('Unauthorized action')
        } else {
          return response
        }
      })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(receiveUpdate(id, json.data.question))
        } else {
          dispatch(flashMessage(json.message))
        }
      })
      .catch(err => {
        throw err
      })
  }
}
