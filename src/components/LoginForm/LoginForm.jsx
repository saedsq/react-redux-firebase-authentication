import React,{useState} from 'react';
import {useDispatch } from 'react-redux';
import classes from './LoginForm.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import {useNavigate} from 'react-router-dom';
import * as actions from '../../store/actions/index';

const LoginForm = ()=> {

    const [isLogin, setIsLogin]= useState(true);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

     const switchAuthModeHandler = ()=> {

        setIsLogin(isLogin=> !isLogin)
        navigate('/signUp');

        }

     const loginSubmitHandler =(event) => {
         event.preventDefault()         

         if(email.trim().length === 0 || password.trim().length ===0 ){
             return;
         }

         if(email.trim().length < 8){
             return;
         }
    
        dispatch(actions.authenticate(email,password,false));
         setEmail('');
         setPassword('');         
         navigate('/todos');

     }

     const setEmailHandler =(event) => {
         setEmail(event.target.value)
     }

     const setPasswordHandler = (event)=> {
        setPassword(event.target.value);

     }
    

    return (
           <div className={classes.loginForm}>
               <Card>         
                <h1>Login</h1>
                <form>
                    <input type='text' placeholder='Your name' className={classes.email} value={email} onChange={setEmailHandler}/>
                    <input type="password" placeholder="Your Password" className={classes.password} value={password} onChange={setPasswordHandler}/>
                    <Button clicked={loginSubmitHandler}>Login</Button>

                </form> 
               
                <button className={classes.button1} onClick={switchAuthModeHandler}>Switch to {isLogin ? 'Sign up' : 'Sign in'}</button>
            
                </Card>
            </div>

    )
}



export default LoginForm;