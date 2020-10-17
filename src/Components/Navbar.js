import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
} from "react-router-dom";

export default function Navbar(props) {
  return (
  <div class="ui borderless huge menu">
    <div class="ui container grid">
      <div class="computer only row">
        <a class="header item">SwiftServe</a>
        <Link to="/home" class="item">Home </Link>
        {!props.loggedIn ? <Link to="/login" className="item">Login</Link>: null}
        <Link to="/layout" className="item">
          {props.userType == "admin" ? "Manage Layout" : "Reserve"}
        </Link>
        {/* {props.userType == "admin" ? <a class="item">Edit Floor</a> : null} */}
        <span class="item right aligned">Logged in as: {props.userType} </span>
      </div>
    </div>
  </div>)
}