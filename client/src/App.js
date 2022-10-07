import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.min.css'
import { Button } from 'antd';
import Home from './pages/Home';
import JobInfo from './pages/JobInfo';
import Profile from './pages/Profile';
import AppliedJobs from './pages/AppliedJobs';
import PostJob from './pages/PostJob';
import {Redirect, Route, Routes} from 'react-router-dom';
import RingLoader from "react-spinners/RingLoader";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllJobs } from './redux/actions/jobActions';
import Register from './pages/Register';
import Login from './pages/Login';
import PostedJob from './pages/PostedJob';
import EditJob from './pages/EditJob';
import { getUsers } from './redux/actions/userActions';
import UserInfo from './pages/UserInfo';


function App() {
  const loader = useSelector(state => state.loaderReducer).loader;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs);
    dispatch(getUsers);
  }, []);

  ProtectedRoute();
  return (
    <div>
      {loader && (<div className="sweet-loading text-center load">
      <RingLoader color={"#36d7b7"} size={150} />
      </div>)}
      
      <Route path="/register" component={Register}>
      </Route>
      <Route path="/login" component={Login}>
      </Route>

      <ProtectedRoute path="/" exact component={Home}>
      </ProtectedRoute>
      <ProtectedRoute path="/jobs/:id" component={JobInfo}>
      </ProtectedRoute>
      <ProtectedRoute path="/profile" exact component={Profile}>
      </ProtectedRoute>
      <ProtectedRoute path="/appliedJobs" component={AppliedJobs}>
      </ProtectedRoute>
      <ProtectedRoute path="/postjob" component={PostJob}>
      </ProtectedRoute>

      <ProtectedRoute path="/posted" component={PostedJob}>
      </ProtectedRoute>
      <ProtectedRoute path="/editjob/:id" component={EditJob}>
      </ProtectedRoute>
      <ProtectedRoute path="/userinfo/:id" component={UserInfo}>
      </ProtectedRoute>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) { //creas un componente que se fije si en el localstorage hay un usuario si es asi que entre en las rutas que se las pasas por props

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user, 'app')
    if (!user) {
      return <Redirect to={'/login'} ></Redirect>
    } else {
      return <Route {...props} ></Route>
    }

}
