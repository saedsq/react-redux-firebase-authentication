import React,{useState} from 'react';
import classes from './AddToDoModal.module.css';
import { useSelector,useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

const AddToDoModal = (props)=> {

    const [todoText,setTodoText] = useState('');
    const dispatch = useDispatch();
    const userId = useSelector(state=> state.authDetails.userId);

    const addTodo  =(e) => {
        e.preventDefault();

        if(todoText.trim().length === 0 ){
            return;
        }

        const newTodo = {
            text:todoText,
            completed:false,
            timeStamp:new Date().toLocaleDateString('en-GB', 
            { day: 'numeric',month:'short',year:'numeric' }),
            userId
        }
        dispatch(actions.createTodo(newTodo));
        setTodoText('');
    }

    return (
        <div className={classes.addToDoModal}>
        <form>
            <h4>Create a Todo</h4>
            <p>Write your Todo and press add button</p>
            <input type='text' className={classes.addToDoInput} value={todoText } onChange={(e)=> setTodoText(e.target.value)} placeholder='Write your Todo here...'/>
            <div className={classes.btnContainer}>
            <button className={classes.addToDo} onClick={addTodo}>Add</button>
            <button className={classes.cancelToDo} onClick={props.cancelTodo}>Cancel</button>
            </div>
        </form>
        </div>


    )
}

export default AddToDoModal