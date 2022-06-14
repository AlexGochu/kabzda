import {authAPI, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';


const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case(GET_CAPTCHA_URL_SUCCESS):
    case(SET_USER_DATA): {
      return {
        ...state,
        captchaUrl: null,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};


export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}});
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const getAuthUserData = () => async (dispatch) => {

  const response = await authAPI.me();

  if (response.data.resultCode === 0) {
    const {id, email, login} = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
  //return authAPI.me()
  /* .then(response => {
   if (response.data.resultCode === 0) {
   const {id, email, login} = response.data.data;
   dispatch(setAuthUserData(id, email, login, true));
   }
   });*/

};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);

  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error.';
    const action = stopSubmit('login', {_error: message});
    dispatch(action);
  }
  // return authAPI.login(email, password, rememberMe)
  //   .then(response => {
  //     if (response.data.resultCode === 0) {
  //       dispatch(getAuthUserData());
  //     } else {
  //       const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error.';
  //       const action = stopSubmit('login', {_error: message});
  //       dispatch(action);
  //     }
  //   });
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptcha();
  const captchaUrl = response.data.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl));

};

export const logout = (email, password, rememberMe) => async dispatch => {
  const response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }

  // return authAPI.logout()
  //   .then(response => {
  //     if (response.data.resultCode === 0) {
  //       dispatch(setAuthUserData(null, null, null, false));
  //     }
  //   });
};
export default authReducer;