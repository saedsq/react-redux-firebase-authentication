import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../../store/actions/index';

const Logout = ()=> {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(actions.authLogout());
        navigate('/')

    },[dispatch,navigate])

    return null;

}

export default Logout;