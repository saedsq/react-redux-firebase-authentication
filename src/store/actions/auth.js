
import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = ()=> {
    return {
        type:actionTypes.AUTH_START
    }
}

const authSuccess = (idToken,userId) => {
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    }

}

const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authLogout = ()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

const authTimeout = (expirationTime)=> {
    return dispatch => {
    setTimeout(()=>{
        dispatch(authLogout())
    },expirationTime *1000)
    }
}

export const authenticate = (email,password,isSignUp)=> {

    return dispatch=> {
        dispatch(authStart());

        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }

        const API_KEY = process.env.REACT_APP_API_KEY;
        let url = (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`);

        if(!isSignUp){
            url =(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`);

        }

        axios.post(url, authData).then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);

            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(authTimeout(response.data.expiresIn));

        }).catch(error => { 
            console.log(error.response)
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {

        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(authLogout())
            }else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(authTimeout((expirationDate.getTime() - new Date().getTime()) /1000));
            }
        }
    }
}