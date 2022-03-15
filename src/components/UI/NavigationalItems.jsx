import React from "react";
import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom';
import classes from './NavigationalItems.module.css';

const NavigationalItems = ()=> {

  const isAuthenticated = useSelector(state => state.authDetails.token );
   
    return (
        <ul className={classes.navigationalItems}>
          {!isAuthenticated 
          ? <li ><NavLink style = {({isActive})=> (isActive ? {backgroundColor:'#787CA4',
          borderBottom:'5px solid white'}: {backgroundColor:'#8A8EB7'})} to='/'>Sign in</NavLink>
          </li> 
          : <li ><NavLink style={({isActive}) => (isActive ? {backgroundColor:'#787CA4',
          borderBottom:'5px solid white'} : {backgroundColor:'#8A8EB7'})} 
          to='/logout'>Logout</NavLink>
          </li>}
          {isAuthenticated === null ?  <li ><NavLink style={({isActive})=> (isActive ? {backgroundColor:'#787CA4',
          borderBottom:'5px solid white'} : {backgroundColor:'#8A8EB7'})}  
          to='/signUp'>Sign up</NavLink></li> :null}
          {isAuthenticated !== null &&  <li ><NavLink style={({ isActive }) => (isActive ? {backgroundColor:'#787CA4',
          borderBottom:'5px solid white'} : {backgroundColor:'#8A8EB7'})}  
          to='/todos'>Add To Do</NavLink></li>}
        </ul>
    )

}

export default NavigationalItems;