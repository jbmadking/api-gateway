import * as actionTypes from '../actions/actionTypes';

const initialState = {
    contextsList: [],
    currentContext: null,
    loading: true,
    error: false,
    searchKey: '',
};

function contextsReducer(state = initialState, action) {

    switch (action.type) {
        case actionTypes.GET_CONTEXTS_START:
            return { ...state, contextsList: [], error: false, loading: true }
        case actionTypes.GET_CONTEXTS_SUCCESS:
            return { ...state, contextsList: action.payload, error: false, loading: false }
        case actionTypes.GET_CONTEXTS_FAIL:
            return { ...state, contextsList: [], error: true, loading: false }
        case actionTypes.GET_CONTEXT_START:
            return { ...state, currentContext: null, error: false, loading: true }
        case actionTypes.GET_CONTEXT_SUCCESS:
            return { ...state, currentContext: action.payload, error: false, loading: false }
        case actionTypes.UPDATE_CONTEXT_START:
            return { ...state, currentContext: null, error: false, loading: true }
        case actionTypes.UPDATE_CONTEXT_SUCCESS:
            return { ...state, currentContext: action.payload, error: false, loading: false }
        case actionTypes.UPDATE_CONTEXT_FAIL:
            return { ...state, currentContext: null, error: true, loading: false }
        case actionTypes.SAVE_SEARCH_KEY:
            return { ...state, searchKey: action.searchKey }

        default:
            return state;
    }
};

export default contextsReducer;