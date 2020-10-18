import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
} from "react-router-dom";

export default function Navbar(props) {

  function logout(){
    props.handleoAuth("")
    props.handleUserType("Not logged in")
  }

  return (
  <div class="ui borderless huge menu">
    <div class="ui container grid">
      <div class="computer only row">
        <a href = "https://github.com/mkyaw6/swift-serve-frontend" class="header item name">SwiftServe</a>
        <Link to="/home" class="item">Home </Link>
        {props.oauth == "" || props.oauth == undefined ? <Link to="/login" className="item">Login</Link>: null}
        {props.oauth != "" && props.oauth != undefined ? <Link onClick = {logout} to="/home" className = "item">Log Out</Link> : null}
          {props.userType == <Link to="/layout" className="item"> "admin" </Link> ? "Manage Layout" : null}
          {props.userType == <Link to="/layout" className="item"> "customer" </Link> ? "Reserve" : null}
        {/* {props.userType == "admin" ? <a class="item">Edit Floor</a> : null} */}
          {props.userType == "admin" ? <Link to = "/viewschedule" className="item"> "View Schedule" </Link>: null}
        <span class="item right aligned">Logged in as: {props.userType} </span>
      </div>
    </div>
  </div>)
}