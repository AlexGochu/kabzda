// Action Types
import {profileAPI, usersAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

export const ADD_POST = '@PROFILE/ADD_POST';
export const SET_USER_PROFILE = '@PROFILE/SET_USER_PROFILE';
export const SET_STATUS = '@PROFILE/SET_STATUS';
export const DELETE_POST = '@PROFILE/DELETE_POST';
export const SAVE_PHOTO_SUCCESS = '@PROFILE/SAVE_PHOTO';

const initialState = {
  posts: [
    {id: 1, message: 'Post 1', likeCount: 55},
    {id: 2, message: 'Second post', likeCount: 42},
    {id: 3, message: 'Third post', likeCount: 30},
    {id: 4, message: 'Fourth post', likeCount: 18}
  ],
  profile: null,
  status: ''
};
const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case(ADD_POST): {
      return {
        ...state,
        posts: [...state.posts, {
          id: state.posts.length + 1,
          message: action.payload.newText,
          likeCount: 0
        }]
      };
    }
    case(SET_USER_PROFILE): {
      return {
        ...state,
        profile: action.payload.profile
      };
    }
    case(SET_STATUS): {
      return {
        ...state,
        status: action.payload.status
      };
    }
    case(DELETE_POST): {
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload.id)
      };
    }
    case(SAVE_PHOTO_SUCCESS): {
      return {
        ...state,
        profile: {...state.profile, photos: {...action.payload.photos}}
      };
    }
    default: {
      return state;
    }
  }

};
// Action creators
export const addPostActionCreator = (text) => ({type: ADD_POST, payload: {newText: text}});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, payload: {profile}});
export const setStatus = (status) => ({type: SET_STATUS, payload: {status}});
export const deletePost = (id) => ({type: DELETE_POST, payload: {id}});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, payload: {photos}});


export const getUserProfile = (userId) => async (dispatch) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
  // .then(response => {
  //   dispatch(setUserProfile(response.data));
  // });
};

export const getUserStatus = (status) => async (dispatch) => {
  const response = await profileAPI.getStatus(status);
  dispatch(setStatus(response.data));
  // .then(response => {
  //   dispatch(setStatus(response.data));
  // });
};

export const updateUserStatus = (status) => async (dispatch) => {
  try {

    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    alert(JSON.stringify(error));
  }
  // .then(response => {
  //   if (response.data.resultCode === 0)
  //     dispatch(setStatus(status));
  // });
};

export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}));
    return Promise.reject(response.data.messages[0]);
  }
};


export default profileReducer;
