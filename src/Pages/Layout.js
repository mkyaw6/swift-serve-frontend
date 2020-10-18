import React from "react";
import { Container } from "semantic-ui-react";
import Editor from "../Canvas"
import Restaurant from "../Restaurant"

export default function Layout(props) {
  console.log(props)
  let { userType, oauth } = props
  return (
    <div>
      <br></br>
      <br></br>
      <Container class='grid middle aligned'> 
        {userType == 'admin' ? <Editor oauth={oauth}/> : null}
        {userType == 'customer' ? <Restaurant oauth={oauth}/> : null}
      </Container>
    </div>
  );
}
