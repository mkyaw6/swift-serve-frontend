import React from "react";
import Layout from "./Pages/Layout"
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import './index.css';
import Navbar from "./Components/Navbar"
import Login from './Pages/Login'
import Ordering from './Pages/Ordering'
import * as serviceWorker from './serviceWorker';
import ViewSchedule from './Pages/ViewSchedule'
export default function App() {
  const [oauth, setOAuth] = React.useState("")
  const [userType, setUserType] = React.useState("Not Logged in")

  function handleoAuth(newVal){
    setOAuth(newVal)
  }

  function handleUserType(newVal){
    setUserType(newVal)
  }
  return (
    // <Container class="center aligned"> 
    <div>
        <BrowserRouter>
    <Navbar userType={userType}/>
    <Switch>
      <Route path="/layout">
        <Layout oauth = {oauth} handleoAuth = {handleoAuth} userType={userType}/>
      </Route>
      <Route path="/login">
        <Login oauth = {oauth} handleoAuth = {handleoAuth} userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path="/ordering">
        <Ordering/>
      </Route>
      <Route path="/viewschedule">
        <ViewSchedule/>
      </Route>
      <Route path="/">
        <Login oauth = {oauth} handleoAuth = {handleoAuth} userType = {userType} handleUserType = {handleUserType}/>
      </Route>
    </Switch>
  </BrowserRouter>
      </div>
    // </Container>
  );
}
