import * as actionTypes from './actionTypes';


const INITIAL_STATE = {
    token: null,
    userId: null,

    authLoading: false,

}

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        //auth cases
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
            }
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            }

        default:
            return state;
    }
}