import React,{useContext, useState} from 'react';
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

import {AuthContext} from "../../context/authContext"

const Navbar = () => {
  const {user, logout} = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home': pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, {name}) => setActiveItem(name);

    return ( 
        <Menu pointing secondary size="massive" color="pink">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          {user ? (
          <Menu.Menu position='right'>
          <Menu.Item
            name={user.username}
            active
            as={Link}
            to="/"
          />
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
        </Menu>
     );
}
 
export default Navbar;