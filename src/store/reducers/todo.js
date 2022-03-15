import * as actionTypes from '../actions/actionTypes';

const initialState = {
    todos : [],
    isLoading:false,
    error:false

}

export const reducer = (state=initialState,action) => {

    switch(action.type){
        case actionTypes.ADD_TODO_START:
            return {
                ...state,
                isLoading:true,
                error:false
                
            }
        case actionTypes.ADD_TODO_SUCCESS:
            const newTodo = {
                id:action.todoId,
                ...action.todos,
                completed:false
            }

            return {
                ...state,
                todos:state.todos.concat(newTodo),
                isLoading:false
            }
        case actionTypes.ADD_TODO_FAIL:
            return {
                ...state,
                error:action.error
            }
        case actionTypes.START_DELETE:
            return {
                ...state,
                isLoading:true,
                error:false
            }
        case actionTypes.DELETE_TODO:
            return {
                ...state,
                todos:state.todos.filter(todo=> todo.id !== action.todoId),
                isLoading:false,
                error:false

            }
        case actionTypes.DELETE_FAIL:
            return {
                ...state,
                isLoading:false,
                error:true

            }
        
        case actionTypes.FETCH_TODOS_START:
            return {
                ...state,
                isLoading:true,
                error:false
            }
        case actionTypes.FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos:action.todos,
                isLoading:false,
            }
        case actionTypes.FETCH_TODO_FAIL:
            return {
                ...state,
                error:action.error
            }
        case actionTypes.TOGGLE_TODO:
            return {
                todos:state.todos.map(todo=> {
                    if(todo.id === action.todoId )
                    return {
                        ...todo,
                        completed:!todo.completed
                    } 
                    return todo;
                })
            }
        default:
            return state;
    }
}

export default reducer;