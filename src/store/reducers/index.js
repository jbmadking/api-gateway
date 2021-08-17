import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contextsReducer from './contextsReducer';
import endpointsReducer from './endpointsReducer';

const rootReducers = combineReducers({
    contextsData: contextsReducer,
    endpointsData: endpointsReducer,
    authData: authReducer,
});

export default rootReducers;