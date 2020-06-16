import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";

let reducers = combineReducers({
    app: appReducer,
    form: formReducer,
    auth: authReducer,
    profilePage: profileReducer,
    usersPage: usersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));
//window.store = store;
export default store;