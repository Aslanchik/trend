import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import {Container} from "semantic-ui-react";

import './styles/main.scss';
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Home from "./components/main/Home"
import Navbar from "./components/navigation/Navbar";
import {AuthProvider} from "./context/authContext";
import AuthRoute from "./util/AuthRoute";

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Container>
    <header>
      <Navbar/>
    </header>
    <Route exact path="/" component={Home}/>
    <AuthRoute exact path="/login" component={Login}/>
    <AuthRoute exact path="/register" component={Register}/>
    </Container>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
