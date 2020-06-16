import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

//Constants
const PROFILE_ADD_POST = 'PROFILE_ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_IS_WAITING_PROFILE = "SET_IS_WAITING_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO";

//State
let initialState = {
    isWaiting: false,
    userProfile: null,
    profileUserStatus: '',
    profilePosts: [
        {id: 1, postText: 'Post-1 from state!'},
        {id: 2, postText: 'Post-2 from state!'},
        {id: 3, postText: 'Post-3 from state!'},
        {id: 4, postText: 'Post-4 from state!'},
        {id: 5, postText: 'Post-5 from state!'}
    ]
};

//Reducer
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_WAITING_PROFILE:
            return {
                ...state,
                isWaiting: action.isWaiting
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            };

        case SET_USER_STATUS:
            return {
                ...state,
                profileUserStatus: action.userStatus
            };

        case SET_PROFILE_PHOTO:
            return {
                ...state,
                userProfile: {...state.userProfile, photos: action.photos}
            };

        case PROFILE_ADD_POST:
            let post = {id: 6, postText: action.newPostText};
            return {
                ...state,
                profilePosts: [...state.profilePosts, post]
            };

        default:
            return state;
    }
};

//Action creators
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const setUserStatus = (userStatus) => ({type: SET_USER_STATUS, userStatus});
export const addPost = (newPostText) => ({type: PROFILE_ADD_POST, newPostText});
export const setIsWaitingProfile = (isWaiting) => ({type: SET_IS_WAITING_PROFILE, isWaiting});
export const setProfilePhoto = (photos) => ({type: SET_PROFILE_PHOTO, photos});

//Thunks
export const getProfile = (userId) => async (dispatch) => {
    dispatch(setIsWaitingProfile(true));
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
    dispatch(setIsWaitingProfile(false));
};

export const getStatus = (userId) => async (dispatch) => {
    dispatch(setIsWaitingProfile(true));
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response));
    dispatch(setIsWaitingProfile(false));
};

export const updateStatus = (status) => async (dispatch) => {
    dispatch(setIsWaitingProfile(true));
    let response = await profileAPI.updateStatus(status);
    if (response.resultCode === 0) {
        dispatch(setUserStatus(status));
        dispatch(setIsWaitingProfile(false));
    } else {
        let err = response.messages.length > 0 ? response.messages[0] : 'Неопределённая ошибка!';
        alert(err + '!');
        dispatch(setIsWaitingProfile(false));
    }
};

export const saveProfilePhoto = (photo) => async (dispatch) => {
    dispatch(setIsWaitingProfile(true));
    let response = await profileAPI.uploadProfilePhoto(photo);
    if (response.resultCode === 0) {
        dispatch(setProfilePhoto(response.data.photos));
        dispatch(setIsWaitingProfile(false));
    } else {
        let err = response.messages.length > 0 ? response.messages[0] : 'Неопределённая ошибка!';
        alert(err + '!');
        dispatch(setIsWaitingProfile(false));
    }
};

export const updateUserProfile = (profile) => async (dispatch, getState) => {
    let userId = getState().auth.userId;
    let response = await profileAPI.updateUserProfile(profile);
    if (response.resultCode === 0) {
        dispatch(getProfile(userId));
    } else {
        let err = response.messages.length > 0 ? response.messages[0] : 'Неопределённая ошибка!';
        dispatch(stopSubmit('editProfileForm', {_error: err}));
    }
};

export default profileReducer;