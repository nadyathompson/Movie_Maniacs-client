import { Link } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";

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
              <Nav.Link as={Link} to={`/signup`} className="navbar-link">Sign Up</Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={Link} to={`/`} className="navbar-link">Home</Nav.Link>
              <Nav.Link as={Link} to={`/users`} className="navbar-link">Profile</Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}