import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
} from "react-router-dom";
import { Button } from 'semantic-ui-react';

export default function Login() {
  return <Button><Link to={{ pathname: '/layout', state: { userType: 'admin'} }}> Login </Link></Button>
}