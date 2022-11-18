import '../styles/NavbarComp.css';
import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from "../screens/Home";
import About from "../screens/About";
import Profile from "../screens/Profile";
import Schedules from "../screens/Schedules";
import CreateProfileTest from "./CreateProfileTest";
import LoginScreen from "../screens/LogIn";
import SignUpScreen from '../screens/SignUp';

  const profilePicture=(
    <div>
      <img width="40" height="40" class="rounded-circle"
          alt="pfp"
          // to be replaced
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      />
    </div>)

export default class NavbarComp extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand as={Link} to={"/home"}>DontBeFake.</Navbar.Brand>
              {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
                  <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
                  <Nav.Link as={Link} to={"/profile"}>My Profile</Nav.Link>
                  <Nav.Link as={Link} to={"/schedules"}>Schedule</Nav.Link>
                  <Nav.Link as={Link} to={"/CreateProfileTest"}>Create Profile Test</Nav.Link>
                </Nav>
                {/* The Nav.Item below could be done better.
                    For the text beside the profile icon.
                    Problems: 
                    * disappears when page collapses
                    * misoriented if placed outside of Navbar.Collapse
                    * haven't put username text underneath
                */}
                <Nav.Item className="ms-auto"> <h10>Name</h10></Nav.Item>
              </Navbar.Collapse>
              <Nav className="ms-auto">
                <NavDropdown title={profilePicture} id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/schedules" element={<Schedules/>}/>
            <Route exact path="/CreateProfileTest" element={<CreateProfileTest/>}/>
            <Route exact path="/login" element={<LoginScreen/>}/>
            <Route exact path="/signup" element={<SignUpScreen/>}/>
          </Routes>
        </div>  
      </Router>
        )
    }
}