import {USER_INFO, LOGOUT, GLOBAL_FEED, UPDATE_LIKES } from "./actionTypes";

export const updateUserInfo = (data) => {
  return {
    type: USER_INFO,
    payload: data
  }
}

export const updateFeeds = (data) => {
  return {
    type: GLOBAL_FEED,
    payload: data
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT
  }
}
export const updateLikes = (data) => {
  return {
    type: UPDATE_LIKES,
    payload : data
  }
}
