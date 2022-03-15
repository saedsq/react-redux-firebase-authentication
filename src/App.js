import './App.css';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Navbar from './components/UI/Navbar';
import SignUpForm from './components/LoginForm/SignUpForm';
import {Routes,Route} from 'react-router-dom';
import AddTodo from './components/Todos/AddTodo';
import Logout from './components/LoginForm/Logout';
import * as actions from './store/actions/index';

function App() {

  const token = useSelector(state => state.authDetails.token );
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(actions.authCheckState());
  },[])

  let routes = (
    <Routes>
      <Route path='/signUp' exact  element={<SignUpForm />}/>
      <Route path='/'  exact element={<LoginForm />}/> 
      <Route path='*' replace element={<Navigate to="/" />} />
       
    </Routes>
  )

  if(token !== null ) {
    routes = (
      <Routes>
        <Route path='/todos' element={<AddTodo/>}/>
        <Route path='/logout' element={<Logout/>}/> 
        <Route path='*' replace element={<Navigate to="/todos" />} /> 
      </Routes>
    )
  } 


  return (
    <div className="App">
      <header>
         <Navbar />
      </header>
      {routes}
    </div>
  );
}

export default App;
