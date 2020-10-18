// import React, { useState, useEffect } from 'react';
// import {
//   BrowserRouter,
//   Link,
//   Route,
// } from "react-router-dom";
// import { Button } from 'semantic-ui-react';

// export default function Login() {
//   // return <Button><Link to={{ pathname: '/layout', state: { userType: 'admin'} }}> Login </Link></Button>
// }
import React from "react";
// import routes from "../nav/Router";
// import {navigate, useRoutes} from "hookrouter";
// import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";
import {Button} from "semantic-ui-react"
import qs from "qs"
import {
  BrowserRouter,
  Link,
  Route,
} from "react-router-dom";
import "../App.css"
const request = require('request')


export default function Login (props){
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [hasAcc, setHasAcc] = React.useState(true)
    const [confirmPass, setConfirmPass] = React.useState("")

    if (hasAcc === true){
        return(
            <div class = "box">
              <h1 class ="ncrLargeTitle">Login</h1>
              <div>
                <input class = "ncrFormField" placeholder = "Email" onChange = {(e) => handleEmail(e)} label = "email"/>
              </div>
              <div>
                <input class = "ncrFormField" type = "password" placeholder = "Password" onChange = {(e) => handlePass(e)} label = "pass"/>
                </div>
                {/* <div>
                </div> */}
                <div class = "margins">
                <Link to = "/home"><Button oauth = {props.oauth} onClick = {handleSubmit}>Log In</Button></Link>
                </div>
                <div/>
                <Button onClick = {toggleAcc}>No Account?</Button>
            </div>
            )
        } else {
            return(
                <div class = "box">
                  <h1 class ="ncrLargeTitle">Register</h1>
                <input class = "ncrFormField" placeholder = "Email" onChange = {(e) => handleEmail(e)} label = "email"/>
                <div/>
                <input class = "ncrFormField" type = "password" placeholder = "Password" onChange = {(e) => handlePass(e)} label = "password"/>
                <div/>
                <input class = "ncrFormField" type = "password" placeholder = "Confirm Password" onChange = {(e) => handleConfirmPass(e)} label = "confirm password"/>
                <div/>
                <Button onClick = {handleRegister}>Register</Button>
                <div/>
                <Button onClick = {toggleAcc}>Have an Account?</Button>
                </div>
            )
        }

    function toggleAcc(){
        setHasAcc(!hasAcc)
        console.log(hasAcc)
    }

    function handleEmail(e){
        setEmail(e.target.value)
    }

    function handlePass(e){
        setPass(e.target.value)
    }

    function handleConfirmPass(e){
        setConfirmPass(e.target.value)
    }

    function handleSubmit(e){
        const options = {
          url: 'https://e09bbfe35b86.ngrok.io/auth/login',
          body: qs.stringify({
            "username": email,
            "password": pass
          }),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }
        var optionsTwo = ""
        request.post(options, function (error, response, body) {
          if(error){
            console.error('error here lol:', error); // Print the error if one occurred
          } else {
        // console.log(JSON.parse(body).access_token)
        props.handleoAuth(JSON.parse(body).access_token)
        console.log(props.oauth);
        optionsTwo = {
          url: 'https://e09bbfe35b86.ngrok.io/auth', 
          headers: {
            "Authorization": "Bearer " + (JSON.parse(body).access_token)
          }
        };
        request(optionsTwo, function (error, repsonse, bodyTwo) {
          if(error){
          console.error('error there xd:', error);
          } else {
          // console.log(JSON.parse(body).is_owner)
          if(JSON.parse(bodyTwo).is_owner){
            props.handleUserType("admin")
          } else if (JSON.parse(body).access_token) {
            props.handleUserType("customer")
          }
        }
        });
      }
          
        // };
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log(response)
        // console.log(JSON.parse(body).access_token)
        // if(JSON.parse(body).is_owner){
        //   props.handleUserType("admin")
        //   console.log("admin")
        // } else {
        //   props.handleUserType("customer")
        //   console.log("customer")
        // }
        // props.handleUserType("admin")
        // console.log(JSON.parse(body).access_token)
        });
        // props.handleoAuth(18)
        // console.log(email)
        // // console.log(pass)
        console.log(props.oauth)
    }

    function handleRegister(){
      const options = {
        url: 'https://e09bbfe35b86.ngrok.io/auth/register',
        body: JSON.stringify({
          "email": email,
          "is_owner": false,
          "username": email,
          "password": pass
        })
      }
      if(pass === confirmPass){
        request.post(options, function (error, response, body){
          if(error){
        console.error('error:', error);
          }

        console.log((body))
        });
      } else {
        console.log("passwords dont match")
      }
    }

    // function navHandler(e){
    //     switch(e){
    //         case "order" :
    //             navigate("/order", {customerEmail: email})
    //     }
    // }
    //big stuff line 5 go look at variant
}

