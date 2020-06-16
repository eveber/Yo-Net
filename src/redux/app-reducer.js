import {authMe} from "./auth-reducer";

//Constants
const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS ";

//State
let initialState = {
    initialized: false
};

//Reducer
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        default:
            return state
    }
};

//Action creators
export const setInitializedSuccess = () => ({type: INITIALIZED_SUCCESS});

//Thunks
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(authMe());
    Promise.all([promise])
        .then(() => {
                dispatch(setInitializedSuccess());
            }
        );
};

export default appReducer;
