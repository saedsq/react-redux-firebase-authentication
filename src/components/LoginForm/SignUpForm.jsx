
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import * as actions from "../../store/actions/index";
import classes from './SignUp.module.css';

const SignUpForm = ()=> {

    const [isLogin, setIsLogin]= useState(true);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signUpSubmitHandler = (event)=> {
        event.preventDefault();
        console.log('how are you');

        if(email.trim().length === 0 || password.trim().length ===0 ){
            return;
        }

        if(email.trim().length < 8){
            return;
        }
   
       dispatch(actions.authenticate(email,password,isLogin));
        console.log(email,password)
        setEmail('');
        setPassword('');         
        navigate('/todos');
 
    }

    const setEmailHandler = (event)=> {
        setEmail(event.target.value);
    }

    const setPasswordHandler = (event)=> {
        setPassword(event.target.value);
    }

    return (
        <div className={classes.signUpForm}>
            <Card> 
            <h1>Sign Up</h1>
            <form>
                <input type='text' placeholder='Your name' className={classes.userName} value={email} onChange={setEmailHandler}/>
                <input type="password" placeholder="Your Password" className={classes.password} value={password} onChange={setPasswordHandler}/>
                <Button clicked={signUpSubmitHandler}>Login</Button>

            </form> 
            </Card>
        </div>
    )
}

export default SignUpForm;