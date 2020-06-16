//Constants
import {usersAPI} from "../api/api";

const SET_USERS = "SET_USERS";
const SET_USERS_COUNT = "SET_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_IS_WAITING_USERS = "SET_IS_WAITING_USERS";
const USER_FOLLOW = "USER_FOLLOW";
const USER_UNFOLLOW = "USER_UNFOLLOW";
const SET_IS_FOLLOWING_USERS = "SET_IS_FOLLOWING_USERS";
const SET_QUERY_TYPE = "SET_QUERY_TYPE";
const SET_SEACH_TERM = "SET_SEACH_TERM";
const SET_FOUND_USERS_COUNT = "SET_FOUND_USERS_COUNT";

//State
let initialState = {
    isWaiting: false,
    users: [],
    followingUsers: [],
    usersPageSize: 100,
    currentPage: 1,
    totalUsersCount: 0,
    foundUsersCount: 0,
    queryType: null,
    term: null
};

//Reducer
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };

        case SET_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            };

        case SET_FOUND_USERS_COUNT:
            return {
                ...state,
                foundUsersCount: action.count
            };

        case USER_FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: true
                        }
                    }
                    return u;
                })
            };

        case USER_UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: false
                        }
                    }
                    return u;
                })
            };

        case SET_IS_FOLLOWING_USERS:
            return {
                ...state,
                followingUsers: action.followMode
                    ? [...state.followingUsers, action.userId]
                    : state.followingUsers.filter((userId) => userId !== action.userId)
            };

        case SET_QUERY_TYPE:
            return {
                ...state,
                queryType: action.queryType
            };

        case SET_SEACH_TERM:
            return {
                ...state,
                term: action.term
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };

        case SET_IS_WAITING_USERS:
            return {
                ...state,
                isWaiting: action.isWaiting
            };

        default:
            return state
    }
};


//Action creators
export const setUsers = (users) => ({type: SET_USERS, users});
export const setUsersCount = (totalUsersCount) => ({type: SET_USERS_COUNT, totalUsersCount});
export const setUserFollow = (userId) => ({type: USER_FOLLOW, userId});
export const setUserUnfollow = (userId) => ({type: USER_UNFOLLOW, userId});
export const setFollowingUser = (followMode, userId) => ({type: SET_IS_FOLLOWING_USERS, followMode, userId});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setQueryType = (queryType) => ({type: SET_QUERY_TYPE, queryType});
export const setSearchTerm = (term) => ({type: SET_SEACH_TERM, term});
export const setFoundUsersCount = (count) => ({type: SET_FOUND_USERS_COUNT, count});
export const setIsWaitingUsers = (isWaiting) => ({type: SET_IS_WAITING_USERS, isWaiting});

//Thunks
export const getUsers = (count, page, term, friend, queryType) => async (dispatch) => {
    dispatch(setIsWaitingUsers(true));
    let response = await usersAPI.getUsers(count, page, term, friend);
    dispatch(setFoundUsersCount(response.items.length));
    dispatch(setUsers(response.items));
    dispatch(setUsersCount(response.totalCount));
    dispatch(setCurrentPage(page));
    dispatch(setSearchTerm(term));
    dispatch(setQueryType(queryType));
    dispatch(setIsWaitingUsers(false));
};

export const followUser = (userId) => async (dispatch) => {
    dispatch(setFollowingUser(true, userId));
    let response = await usersAPI.followUser(userId);
    if (response.resultCode === 0) {
        dispatch(setUserFollow(userId));
        dispatch(setFollowingUser(false, userId));
    }
};

export const unFollowUser = (userId) => async (dispatch) => {
    dispatch(setFollowingUser(true, userId));
    let response = await usersAPI.unFollowUser(userId);
    if (response.resultCode === 0) {
        dispatch(setUserUnfollow(userId));
        dispatch(setFollowingUser(false, userId));
    }

};

export default usersReducer;
