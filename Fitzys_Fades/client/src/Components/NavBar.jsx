//import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import Auth from '../utils/auth';

const AppNavbar = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Fitzys Fades
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ms-auto'>
              {/* link to Signup and Signin pages if not logged in */}
              {!Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                  <Nav.Link as={Link} to='/signin'>Sign In</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
