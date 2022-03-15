import React,{useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import classes from './AddTodo.module.css';
import AddToDoModal from '../UI/AddToDoModal';
import * as actions from "../../store/actions/index";
import axios from 'axios';
import TodoItem from "./TodoItem";

const AddTodo = (props)=> {

const [showModal,setShowModal] = useState(false)
const [isChecked,setIsChecked] = useState(false);
const dispatch = useDispatch();
const todos = useSelector(state=> state.todos.todos);
const userId = useSelector(state=> state.authDetails.userId);


useEffect(()=>{
  dispatch(actions.fetchTodos(userId));
},[dispatch,userId])
 
  const addTodoHandler=(e)=> {
    e.preventDefault();
    setShowModal(true);

  }

  const cancelTodoHandler = (e)=> {
      e.preventDefault();
      setShowModal(false);
  
  }

  const toggleHandler = (todoId)=> {

    setIsChecked(!isChecked );
    console.log(isChecked);
    const updateTodo ={completed:isChecked}
    dispatch(actions.onToggle(todoId,updateTodo));

  }
  
  const deleteTodoHandler =(event,todoId) => {

    event.preventDefault();
    axios.delete(`https://react-todoapp-10b8c-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${todoId}.json`)
        .then(responseData => {
            console.log(responseData)
        })
        .then(error => console.log('something went wrong',error));

      dispatch(actions.fetchTodos(userId));
    
  }

  
      const allTodos =  todos.map(todo=> <TodoItem key={todo.id} text={todo.text} todoTimeStamp={todo.timeStamp}
                        todoId={todo.id} isCompleted={todo.completed} toggleTodo={toggleHandler} 
                        deleteTodo={deleteTodoHandler} todoStatus={isChecked}/>);
  
  
    return (
        <div className={classes.addTodo}>
                <p className={classes.addToDoText}>Click on the button to add a Todo</p>
                <button onClick={addTodoHandler} className={classes.addBtn}>Add</button>
            {showModal && <AddToDoModal cancelTodo={cancelTodoHandler}/>}
      
            {todos.length !== 0  && <div className={classes.todoHeading} >
                <h3 style={{marginLeft:'20px',marginRight:'250px'}}>Todo</h3>
                <h3>Date</h3>
                <h3 style={{marginLeft:'40px'}}>Status</h3>
                <h3 style={{marginRight:'10px'}}>Delete</h3>
              </div>} 

            <ul className={classes.listContainer}>
                {allTodos}
            </ul>

        </div>

    )
}

export default AddTodo;