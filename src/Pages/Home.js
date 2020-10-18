import React from "react"
import "../App.css"
import logo from "../logo.png"

export default function Home (props){
    return(
        <div class = "box">
            <img  src = {logo}/>
            <h1 class = "intro">Welcome!</h1>
        </div>
    );
}