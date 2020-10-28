import React,{useContext, useState} from 'react';
import {Container, Menu, Popup} from "semantic-ui-react";
import {Link} from "react-router-dom";

import {AuthContext} from "../../context/authContext"

const Navbar = () => {
  const {user, logout} = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home': pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, {name}) => setActiveItem(name);

    return ( 
        <Menu pointing secondary size="massive" color="pink" style={{marginBottom:30}}>
          <Container>
          <Menu.Item
            name='home'
            onClick={handleItemClick}
            active={activeItem === 'home' || user?.username}
            as={Link}
            link
            to="/"
          />
          {user ? (
            <Menu.Menu position='right'>
            <Popup content="My posts" inverted className="pink" trigger={<Menu.Item
            name={user.username}
            onClick={()=> setActiveItem('myPosts')}
            active={activeItem === 'myPosts'}
            as={Link}
            className="myPostsMenuLink"
            to="/myPosts"
          />}/>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={logout}
            />
          </Menu.Menu>
          ):(
          <Menu.Menu position='right'>
              <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            
            to="/login"
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
          </Menu.Menu>
          )}
          </Container>
        </Menu>
     );
}
 
export default Navbar;