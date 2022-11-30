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
//import Home from "../screens/Home";
import MyFriendsScreen from "../screens/MyFriends";
import Profile from "../screens/Profile";
import Schedules from "../screens/Schedules";
import Calender from "../screens/Calender";
import CreateProfileTest from "./CreateProfileTest";
import LoginScreen from "../screens/LogIn";
import SignUpScreen from '../screens/SignUp';
import SearchGroupScreen from '../screens/SearchGroups';
import Group from '../screens/Group';
import JoinGroup from '../screens/JoinGroup';
import ViewGroups from '../screens/ViewGroups';
import { useNavigate } from "react-router";
import YouShouldLogInScreen from '../screens/YouShouldLogin';
import Error from '../screens/Error';
import VotingScreen from '../screens/Voting';
import HeatMap from '../screens/HeatMap';
import MiniNav from '../components/MiniNav';
import EditGroupScreen from '../screens/EditGroup'

//forgive me:
import face_default from "../assets/face_default.png";
import face_happy from "../assets/face_happy.png";
import face_ditto from "../assets/face_ditto.png";
import face_angry from "../assets/face_angry.png";
import face_winky from "../assets/face_winky.png";
import face_XD from "../assets/face_XD.png";
const pfps = [face_default,face_happy,face_ditto,face_angry,face_winky,face_XD];

function logout() {
  localStorage.removeItem("DBF_username");
}

async function getInformation() {
  var DBF_username = localStorage.getItem("DBF_username");
  if(DBF_username == null) {
      // this should NEVER happen
      DBF_username = "chang";
  }
  
  const response = await fetch(`http://localhost:5000/profile/`);

  if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
  }
  
  const records = await response.json();
  for(var record of records) {
      if(record.username === DBF_username) {
          return record;
      }
  }
  return null;
}

export default class NavbarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name:  "",
      loginOrLogout: "Login.",
      pfp: pfps[0], // default skin
    }
    this.init();
  }

  async init() {
    // name initilization

    var profileInfo = await getInformation();
    if(profileInfo == null) {
      return;
    }

    //username initalization
    var DBF_username = localStorage.getItem("DBF_username");
    var status = "Login."
    if(DBF_username !== null) {
      status = "Logout."
    }

    if(profileInfo != null) {
      if(profileInfo.profilePicture === "") { //profile hasn't chosen a pfp yet
        this.setState({name: profileInfo.name,username: "@"+DBF_username, loginOrLogout: status,},
          () => {
             this.render(); // re-renders after initalization is done.
         });

      }
      else {
      this.setState({name: profileInfo.name,username: "@"+DBF_username, loginOrLogout: status, pfp: pfps[profileInfo.profilePicture]},
        () => {
           this.render(); // re-renders after initalization is done.
       });
      }
    }
  }

  render() {

    const profilePicture=(
      <div>
        <img id="pfp_dd" width="40" height="40" class="rounded-circle"
            alt="pfp"
            src={this.state.pfp}
        />
      </div>)


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
                  {/* <Nav.Link as={Link} to={"/Calendar"}>Calendar</Nav.Link> */}
                  <Nav.Link as={Link} to={"/schedules"}>Schedules</Nav.Link>
                  <Nav.Link as={Link} to={"/searchgroups"}>Search Group</Nav.Link>
                  <Nav.Link as={Link} to={"/joingroup"}>Join Group</Nav.Link>
                  <Nav.Link as={Link} to={"/viewgroup"}>view Group</Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Nav className="ms-auto">
                <Navbar.Collapse>
                 <div class="nav-userinfo">
                    <b><div id="nav-name">{this.state.name}</div></b>
                    <b><div id="nav-username">{this.state.username}</div></b>
                 </div>
                </Navbar.Collapse>
                <NavDropdown title={profilePicture} id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logout} href="/login">{this.state.loginOrLogout}</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route exact path="/viewgroup" element={<ViewGroups/>}/>
            <Route exact path="/" element={<LoginScreen/>}/> 
            <Route exact path="/myfriends" element={<MyFriendsScreen/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/schedules" element={<Schedules/>}/>
            {/* Place MiniNav bar in wanted screens like this: */}
            <Route exact path="/calendar" element={<><MiniNav/><Calender/></>}/>
            <Route exact path="/login" element={<LoginScreen/>}/>
            <Route exact path="/signup" element={<SignUpScreen/>}/>
            <Route path="/group=:groupID" element={<Group/>}/>
            <Route exact path="/joingroup" element={<JoinGroup/>}/>
            <Route exact path="/searchgroups" element={<SearchGroupScreen/>}/>
            <Route exact path="/editgroup=:groupID" element={<EditGroupScreen/>}/>
            <Route exact path="/youshouldlogin" element={<YouShouldLogInScreen/>}/>
            <Route exact path="/error" element={<Error/>}/>
            <Route exact path="/voting" element={<><MiniNav/><VotingScreen/></>}/>
            <Route path="/heatmap=:groupID" element={<HeatMap/>}/>
          </Routes>
        </div>
      </Router>
        )
    }
}