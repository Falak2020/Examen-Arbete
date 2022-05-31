import { SETSIGNIN } from './actionTypes'
const intialState = {
  isSignIn: false,
  
}

export const mainReducer = (state = intialState, action) => {
  switch (action.type) {

    case SETSIGNIN:
      return { ...state, isSignIn: action.payload }

    default:
      return state;
  }
}