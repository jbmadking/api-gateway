import axios from 'axios';
import * as actionTypes from '../store/actions/actionTypes';
import jwtDecode from 'jwt-decode';
const AuthService = {

    login(dispatch, username, password, grantType) {

        dispatch({ type: actionTypes.AUTH_START, payload: null })

        var bodyFormData = new FormData();

        bodyFormData.append('username', username);
        bodyFormData.append('password', password);
        bodyFormData.append('grant_type', 'password');

        const config = {
            headers: { 'Authorization': 'Basic YWdlbnQ6cGFzc3dvcmQ=' }
        }

        axios.post('https://hapx-apigw.nvizible.co.za/oauth/token', bodyFormData, config)
            .then(response => {

                let expiryDate = new Date();
                expiryDate.setSeconds(expiryDate.getSeconds() + response.data.expires_in);

                localStorage.setItem('expirationDate', expiryDate)
                localStorage.setItem('authToken', response.data.access_token);

                dispatch({ type: actionTypes.AUTH_SUCCESS, payload: response.data })
            })
            .catch(() => {
                dispatch({ type: actionTypes.AUTH_FAIL, payload: null })
            })
            .finally(() => { })
    },

    checkLoggedIn(dispatch) {

        const authToken = localStorage.getItem('authToken');
        dispatch({ type: actionTypes.AUTH_CHECK_LOCAL_STORE_START, payload: null })

        if (!authToken) {
            dispatch({ type: actionTypes.AUTH_LOGOUT, payload: null })
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()) {
                dispatch({ type: actionTypes.AUTH_LOGOUT, payload: null })
            } else {
                dispatch({ type: actionTypes.AUTH_CHECK_LOCAL_STORE_SUCCESS, payload: authToken })
            }
        }
    },

    logOut(dispatch) {
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('authToken')
        dispatch({ type: actionTypes.AUTH_LOGOUT, payload: null })
    },

    getUsername() {
        const authToken = localStorage.getItem('authToken')
        const decodedToken = jwtDecode(authToken);
        return decodedToken.user_name;
    }
}

export default AuthService;