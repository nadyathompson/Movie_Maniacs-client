import { Link } from "react-router-dom";

import { Nav, Navbar, Container, Button } from "react-bootstrap";

export const NavBar = ({user, onLoggedOut}) => {
  return (
    <Navbar>
      <Navbar.Brand as={Link} to="/">MovieManiacs</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          { !user && (
            <>
              <Nav.Link as={Link} to={`/`} className="navbar-link">Home</Nav.Link>
              <Nav.Link as={Link} to={`/login`} className="navbar-link">Login</Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={Link} to={`/`} className="navbar-link">Home</Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}