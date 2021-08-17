import api from '../utils/api';
import * as actionTypes from '../store/actions/actionTypes';
const ContextsService = {

    loadContexts(dispatch, token) {
        dispatch({
            type: actionTypes.GET_CONTEXTS_START,
            payload: null
        })
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }

        api.get('contexts', config)
            .then(response => {

                dispatch({
                    type: actionTypes.GET_CONTEXTS_SUCCESS,
                    payload: response.data.contexts
                })
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: actionTypes.GET_CONTEXTS_FAIL,
                    payload: null
                })
            }).finally(() => { })
    },

    loadCurrentContext(dispatch, id, token) {

        dispatch({ type: actionTypes.GET_CONTEXT_START, payload: null })

        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }

        api.get('contexts/' + id, config)
            .then(response => {
                dispatch({
                    type: actionTypes.GET_CONTEXT_SUCCESS,
                    payload: response.data.contexts
                })
            })
            .catch(() => {
                dispatch({ type: actionTypes.GET_CONTEXT_FAIL, payload: null })
            })
            .finally(() => { })
    },

    saveContext(dispatch, newContext, token) {
        dispatch({
            type: actionTypes.SAVE_CONTEXT_START,
            payload: null
        })
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }

        api.post(
            '/contexts',
            newContext,
            config
        ).then(response => {
            dispatch({
                type: actionTypes.SAVE_CONTEXT_SUCCESS,
                payload: response.data
            })

            ContextsService.loadContexts(dispatch, token);
            ContextsService.loadCurrentContext(dispatch, response.data.contexts.id, token)
        })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: actionTypes.SAVE_CONTEXT_FAIL,
                    payload: null
                })
            }).finally(() => { })
    }
    ,
    updateContext(dispatch, id, updatedContext, token) {
        dispatch({
            type: actionTypes.UPDATE_CONTEXT_START,
            payload: null
        })
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }

        api.put(
            'contexts/' + id,
            updatedContext,
            config
        ).then(response => {
            dispatch({
                type: actionTypes.UPDATE_CONTEXT_SUCCESS,
                payload: response.data
            })

            ContextsService.loadContexts(dispatch, token);
            ContextsService.loadCurrentContext(dispatch, response.data.contexts.id, token)
        })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: actionTypes.UPDATE_CONTEXT_FAIL,
                    payload: null
                })
            }).finally(() => { })
    },

    setContextSearchText(dispatch, searchText) {
        dispatch({
            type: actionTypes.SAVE_SEARCH_KEY,
            searchKey: searchText,
        })
    }
}

export default ContextsService;