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
import Home from './Pages/Home'
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
    <Navbar userType={userType} oauth = {oauth} handleoAuth = {handleoAuth} handleUserType = {handleUserType}/>
    <Switch>
      <Route path="/layout">
        <Layout oauth = {oauth} handleoAuth = {handleoAuth} userType={userType}/>
      </Route>
      <Route path="/login">
      <Login oauth = {oauth} handleoAuth = {handleoAuth} userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path="/ordering/:tableId">
        <Ordering/>
      </Route>
      <Route path="/viewschedule">
        <ViewSchedule oauth = {oauth} />
      </Route>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/">
        <Home/>
      </Route>
    </Switch>
  </BrowserRouter>
      </div>
    // </Container>
  );
}
