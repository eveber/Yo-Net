import {authAPI, profileAPI} from "../api/api";
import {stopSubmit} from 'redux-form';

//Constants
const SET_AUTH_DATA = "SET_AUTH_DATA";
const SET_CAPTCHA = "SET_CAPTCHA";
const SET_USER_PHOTO_URL = "SET_USER_PHOTO_URL";
const SET_IS_WAITING_AUTH = "SET_IS_WAITING_AUTH";

//State
let initialState = {
    isWaiting: false,
    isAuth: false,
    userId: null,
    email: null,
    login: null,
    userPhotoUrl: null,
    captcha: null
};

//Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.payload
            };

        case SET_USER_PHOTO_URL:
            return {
                ...state,
                userPhotoUrl: action.userPhotoUrl
            };

        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.captchaUrl
            };

        case SET_IS_WAITING_AUTH:
            return {
                ...state,
                isWaiting: action.isWaiting
            };

        default:
            return state
    }
};

//Action creators
//export const setIsWaitingAuth = (isWaiting) => ({type: SET_IS_WAITING_AUTH, isWaiting});
export const setAuthData = (userId, email, login, isAuth) => ({
    type: SET_AUTH_DATA,
    payload: {userId, email, login, isAuth}
});
export const setCaptcha = (captchaUrl) => ({type: SET_CAPTCHA, captchaUrl});
export const setUserPhotoUrl = (userPhotoUrl) => ({type: SET_USER_PHOTO_URL, userPhotoUrl});

//Thunks
export const authMe = () => async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.resultCode === 0) {
        let {id, email, login} = {...response.data};
        dispatch(setAuthData(id, email, login, true));

        //Querry for user photo
         profileAPI.getProfile(id)
            .then(response => {
            dispatch(setUserPhotoUrl(response.photos.small));
        });
    }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.resultCode === 0) {
        dispatch(authMe());
        dispatch(setCaptcha(null))
    } else {
        if (response.resultCode === 10) {
            let response = await authAPI.getCaptcha();
            dispatch(setCaptcha(response.url))
        }
        let err = response.messages.length > 0 ? response.messages[0] : 'Ошибка авторизации!';
        dispatch(stopSubmit('login', {_error: err}));
    }
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setAuthData(null, null, null, false));
    }
};

export const refreshCaptcha = () => async (dispatch) => {
    let response = await authAPI.getCaptcha();
    dispatch(setCaptcha(response.url))
};

export default authReducer;
