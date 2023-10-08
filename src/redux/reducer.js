import {USER_INFO, LOGOUT, GLOBAL_FEED, UPDATE_LIKES} from "./actionTypes"

const initialState = {
  userInfo: null,
  feeds: null,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_INFO: {
      return {
        ...state,
        userInfo: action.payload
      }
    }
    case GLOBAL_FEED: {
      return {
        ...state,
        feeds: action.payload
      }
    }
    case LOGOUT: {
      localStorage.clear();
      return {
        ...initialState
      }
    }
    case UPDATE_LIKES : {
      return {
        ...state,
        feeds : action.payload,
      }
    }
    default: {
      return {...state};
    }
  }
}

export default reducer;