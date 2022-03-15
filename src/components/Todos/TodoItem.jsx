import React from "react";
import classes from './TodoItem.module.css';
import {FaRegTrashAlt} from 'react-icons/fa';


const TodoItem = (props) => {


    return (
        <li className={classes.list}><span style={props.isCompleted ? {textDecoration : 'line-through' }
            : {} } className={classes.todoText}>{props.text}</span>
            <div className={classes.todoFeature}>
              <span className={classes.timeStamp}>{props.todoTimeStamp}</span>
              <input id='completed' type='checkbox' value={props.todoStatus} onChange={()=> props.toggleTodo(props.todoId)}/>
              <label  htmlFor='completed'>Completed</label> 
              </div>
              <FaRegTrashAlt onClick={(event)=> props.deleteTodo(event,props.todoId)} style={{fontSize:'22px',marginRight:'30px',fill:'red',width:'30px',height:'30px',alignSelf:"center"}} /> 
            
            </li>
    )
}

export default TodoItem;