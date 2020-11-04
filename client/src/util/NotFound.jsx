import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

const NotFound = () => {
    return ( 
        <Container textAlign="center" className="notFoundWrapper" data-aos="fade-in">
            <img src="/img/not_found.svg" alt="not found" className="notFoundImg"/>
            <h2>Seems like you got lost..</h2>
            <Link to="/">Click me to go Home.</Link>
        </Container>
     );
}
 
export default NotFound;