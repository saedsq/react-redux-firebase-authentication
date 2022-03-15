import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addTodoStart = ()=> {
    return {
        type:actionTypes.ADD_TODO_START
    }
}

export const addTodoSuccess = (id,newTodo)=> {
    return {
        type:actionTypes.ADD_TODO_SUCCESS,
        todoId:id,
        todos:newTodo

    }
}

export const addTodoFail =(error)=> {
    return {
        type: actionTypes.ADD_TODO_FAIL,
        error

    }
}

export const startDelete = ()=>{
    return{
        type:actionTypes.START_DELETE
    }
}
export const deleteTodo = (id)=> {
    return {
        type:actionTypes.DELETE_TODO,
        todoId:id
    }
}

export const deleteFail = ()=> {
    return {
        type:actionTypes.DELETE_FAIL
        
    }
}



export const createTodo = (newTodo)=> {
    return dispatch => {
        dispatch(addTodoStart());

        axios('https://react-todoapp-10b8c-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            data: JSON.stringify(newTodo)})
        .then(responseData => {
            console.log(responseData.data)
        dispatch(addTodoSuccess(responseData.data.name,newTodo));
        })
        .catch(error=> {
            console.log(error.response.data.error);
            dispatch(addTodoFail(error.response.data.error))
        });

    }
}

export const fetchTodosStart= () => {
    return {
        type:actionTypes.FETCH_TODOS_START
    }
}

export const fetchTodosSuccess = (todos)=> {
    return {
        type:actionTypes.FETCH_TODOS_SUCCESS,
        todos
    }
}

export const fetchTodosFail = (error)=> {
    return {
        type:actionTypes.FETCH_TODO_FAIL,
        error
    }
}

export const fetchTodos = (userId)=>{
    return dispatch => {
        dispatch(fetchTodosStart());

        axios.get(`https://react-todoapp-10b8c-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json?orderBy="userId"&equalTo="${userId}"`)
        .then(responseData => {
            const fetchTodos = [];
            for(let key in responseData.data){
                fetchTodos.push({
                    ...responseData.data[key],
                    id:key
                })
            }
            dispatch(fetchTodosSuccess(fetchTodos))
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchTodosFail(error.response.data.error));
        
        })
    }
}

export const toggleTodo = (id)=> {
    return {
        type:actionTypes.TOGGLE_TODO,
        todoId:id
    }
}

export const onToggle = (todoId,updateTodo)=> {

    return dispatch => {
    axios(`https://react-todoapp-10b8c-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${todoId}/` +'.json',{
    method: 'PATCH',
    headers:{'Content-Type':'application/json'},
    data: JSON.stringify(updateTodo)})
        .then(responseData => {
            console.log(responseData);
            dispatch(toggleTodo(todoId));
        })
        .then(error => console.log('something went wrong',error));
    }
}


  
export const onDelete = (todoId)=> {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    return async dispatch => {
        dispatch(startDelete());
        try{
            const responseData = await axios.delete(`${proxy}http://react-todoapp-10b8c-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${todoId}.json`);
            console.log(responseData.data);
        }catch(error){
            console.log(error);
        }
        
    }    
    
}


