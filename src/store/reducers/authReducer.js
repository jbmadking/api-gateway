import * as actionTypes from '../actions/actionTypes';

const initialState = {
    accessToken: '',
    refreshToken: '',
    loading: true,
    error: false,
};

function authReducer(state = initialState, action) {

    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                accessToken: '',
                refreshToken: '',
                error: false,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                error: false,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                accessToken: '',
                refreshToken: '',
                error: true,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                accessToken: '',
                refreshToken: '',
                error: false,
                loading: false
            }
        case actionTypes.AUTH_CHECK_LOCAL_STORE_START:
            return {
                ...state,
                accessToken: null,
            }
        case actionTypes.AUTH_CHECK_LOCAL_STORE_SUCCESS:
            return {
                ...state,
                accessToken: action.payload,
                error: false,
                loading: false
            }
        default:
            return state;
    }
};

export default authReducer;