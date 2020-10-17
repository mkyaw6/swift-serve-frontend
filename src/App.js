import React from "react";
import Layout from "./Layout"
import Navbar from "./Components/Navbar"
export default function App() {
  return (
    // <Container class="center aligned"> 
    <div>
      <Navbar userType='admin'/>
      <br></br>
      <br></br>
      <Layout userType='admin'/>
      </div>
    // </Container>
  );
}
