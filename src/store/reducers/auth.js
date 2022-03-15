
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token:null,
    userId:null,
    isLoading:false,
    error:null
    
}

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                isLoading:true,
                error:null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token:action.idToken,
                userId:action.userId,
                isLoading:false,
                error:null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.error,
                
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token:null,
                userId:null
            }
        default:
            return state;
    }
}

export default reducer;