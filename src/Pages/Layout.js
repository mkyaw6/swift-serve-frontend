import React from "react";
import { Container } from "semantic-ui-react";
import Editor from "../Canvas"
import Restaurant from "../Restaurant"

export default function Layout(props) {
  console.log(props)
  let { userType } = props
  return (
    <div>
      <br></br>
      <br></br>
      <Container class='grid middle aligned'> 
        {userType == 'admin' ? <Editor/> : null}
        {userType == 'customer' ? <Restaurant/> : null}
      </Container>
    </div>
  );
}
