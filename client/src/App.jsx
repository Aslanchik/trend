import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import {Container} from "semantic-ui-react";

import './styles/main.scss';
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Home from "./components/main/Home"
import Navbar from "./components/navigation/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
    <header>
      <Navbar/>
    </header>
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>

    </Container>
    </BrowserRouter>
  );
};

export default App;
