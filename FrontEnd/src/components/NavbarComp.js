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
import MyFriendsScreen from "../screens/MyFriends";
import Profile from "../screens/Profile";
import Schedules from "../screens/Schedules";
import Calender from "../screens/Calender";
import CreateProfileTest from "./CreateProfileTest";
import LoginScreen from "../screens/LogIn";
import SignUpScreen from '../screens/SignUp';

  const profilePicture=(
    <div>
      <img id="pfp_dd" width="40" height="40" class="rounded-circle"
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
          <Navbar bg="dark" variant="dark" expand="md">
            <Container>
              <Navbar.Brand as={Link} to={"/schedules"}>DontBeFake.</Navbar.Brand>
              {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {/* <Nav.Link as={Link} to={"/home"}>Home</Nav.Link> */}
                  <Nav.Link as={Link} to={"/myfriends"}>MyFriends</Nav.Link>
                  {/* <Nav.Link as={Link} to={"/Calendar"}>Calendar</Nav.Link> */}
                  <Nav.Link as={Link} to={"/schedules"}>Schedules</Nav.Link>
                  <Nav.Link as={Link} to={"/CreateProfileTest"}>Create Profile Test</Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Nav className="ms-auto">
                <Navbar.Collapse>
                 <div class="nav-userinfo">
                    <b><div id="nav-name">Name</div></b>
                    <b><div id="nav-username">username</div></b>
                 </div>
                </Navbar.Collapse>
                <NavDropdown title={profilePicture} id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
        </div>
        <div>
          <Routes>
            {/* <Route exact path="/home" element={<Home/>}/> */}
            <Route exact path="/myfriends" element={<MyFriendsScreen/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/schedules" element={<Schedules/>}/>
            <Route exact path="/calendar" element={<Calender/>}/>
            <Route exact path="/CreateProfileTest" element={<CreateProfileTest/>}/>
            <Route exact path="/login" element={<LoginScreen/>}/>
            <Route exact path="/signup" element={<SignUpScreen/>}/>
          </Routes>
        </div>  
      </Router>
        )
    }
}