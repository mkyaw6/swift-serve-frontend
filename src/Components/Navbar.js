import React, { useState, useEffect } from 'react';
export default function Navbar(props) {
  return (
  <div class="ui borderless huge menu">
    <div class="ui container grid">
      <div class="computer only row">
        <a class="header item">SwiftServe</a>
        <a class="item">Home</a>
        {props.userType == "admin" ? <a class="item">Edit Floor</a> : null}
        <span class="item right aligned">Logged in as: {props.userType} </span>
      </div>
    </div>
  </div>)
}