import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';

import './styles/main.scss';
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Home from "./components/main/Home"
import Navbar from "./components/navigation/Navbar";
import {AuthProvider} from "./context/authContext";
import AuthRoute from "./util/AuthRoute";
import PostPage from "./components/posts/PostPage";

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>

    <header>
      <Navbar/>
    </header>
    <Route exact path="/" component={Home}/>
    <AuthRoute exact path="/login" component={Login}/>
    <AuthRoute exact path="/register" component={Register}/>
    <Route exact path="/posts/:postId" component={PostPage}/>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
