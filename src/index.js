import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import './index.css';
import Layout from './Pages/Layout';
import Navbar from "./Components/Navbar"
import Login from './Pages/Login'
import * as serviceWorker from './serviceWorker';

function Home(){
  return <h1>Home</h1>
}
ReactDOM.render(
  <BrowserRouter>
    <Navbar userType='admin'/>
    <Switch>
      <Route path="/layout">
        <Layout userType="customer"/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/">
        <Home/>
      </Route>
    </Switch>
    {/* <App /> */}
  </BrowserRouter>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
