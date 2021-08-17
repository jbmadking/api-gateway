import * as actionTypes from '../actions/actionTypes';

const initialState = {
    endpointsList: [],
    currentEndpoint: null,
    loading: true,
    error: false,
};

function endpointsReducer(state = initialState, action) {

    switch (action.type) {
        case actionTypes.GET_ENDPOINTS_START:
            return { ...state, endpointsList: [], error: false, loading: true }
        case actionTypes.GET_ENDPOINTS_SUCCESS:
            return { ...state, endpointsList: action.payload, error: false, loading: false }
        case actionTypes.GET_ENDPOINTS_FAIL:
            return { ...state, endpointsList: [], error: true, loading: false }
        case actionTypes.GET_ENDPOINT_EDIT_START:
            return { ...state, currentEndpoint: action.payload, error: false, loading: false }
        case actionTypes.GET_ENDPOINT_EDIT_END:
            return { ...state, currentEndpoint: null, error: false, loading: false }
        default:
            return state;
    }
};

export default endpointsReducer;