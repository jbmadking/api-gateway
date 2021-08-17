import api from '../utils/api';
import * as actionTypes from '../store/actions/actionTypes';
import ContextsService from './ContextsService';

const EndpointsService = {

    loadEndpoints(dispatch, id, token) {

        dispatch({ type: actionTypes.GET_ENDPOINTS_START, payload: null })

        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }

        api.get('contexts/' + id, config)
            .then(response => {
                dispatch({
                    type: actionTypes.GET_ENDPOINTS_SUCCESS,
                    payload: response.data.contextResponse.endpointResponses
                })
            })
            .catch(() => {
                dispatch({ type: actionTypes.GET_ENDPOINTS_FAIL, payload: null })
            })
            .finally(() => { })
    }
    ,
    saveEndpoint(dispatch, newEndpoint, contextId, token) {
        dispatch({
            type: actionTypes.SAVE_ENDPOINT_START,
            payload: null
        })

        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }

        api.post('contexts/' + contextId + '/endpoints',
            newEndpoint,
            config
        ).then(response => {
            dispatch({
                type: actionTypes.SAVE_ENDPOINT_SUCCESS,
                payload: response.data.endpoint
            })

            ContextsService.loadCurrentContext(dispatch, contextId, token);
        }).catch((err) => {
            console.log(err);
            dispatch({
                type: actionTypes.SAVE_ENDPOINT_FAIL,
                payload: null
            })
        }).finally(() => { })
    },
    updateEndpoint(dispatch, updateEndpoint, endpointId, contextId, token) {
        dispatch({
            type: actionTypes.SAVE_ENDPOINT_START,
            payload: null
        })

        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }

        api.put('contexts/' + contextId + '/endpoints/' + endpointId,
            updateEndpoint,
            config
        ).then(response => {
            dispatch({
                type: actionTypes.SAVE_ENDPOINT_SUCCESS,
                payload: response.data.endpoint
            })

            ContextsService.loadCurrentContext(dispatch, contextId, token);
        }).catch((err) => {
            console.log(err);
            dispatch({
                type: actionTypes.SAVE_ENDPOINT_FAIL,
                payload: null
            })
        }).finally(() => { })
    },

    getEndpoint(dispatch, endpoint) {
        dispatch({
            type: actionTypes.GET_ENDPOINT_EDIT_START,
            payload: endpoint,
        })
    }
}

export default EndpointsService;