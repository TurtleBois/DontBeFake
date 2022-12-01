import React, { useState, useEffect, Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

import '../styles/Profile.css';
import face_default from "../assets/face_default.png";
import face_happy from "../assets/face_happy.png";
import face_ditto from "../assets/face_ditto.png";
import face_angry from "../assets/face_angry.png";
import face_winky from "../assets/face_winky.png";
import face_XD from "../assets/face_XD.png";
const pfps = [face_default,face_happy,face_ditto,face_angry,face_winky,face_XD];

const ProfileScreen = () => {

    //TODO: redirect user to login page if they are not signed in (aka don't display profile unless a user is actually logged in)

    const [form, setForm] = useState({  
        username: localStorage.getItem("DBF_username"), 
        name: localStorage.getItem("name") == "undefined" ? "" : localStorage.getItem("name"),
        profilePicture: localStorage.getItem("profilePicture") == "undefined" || localStorage.getItem("profilePicture") == ""
        ? 0 : localStorage.getItem("profilePicture"),
        userDescription: localStorage.getItem("userDescription") == "undefined" ? "" : localStorage.getItem("userDescription"),
    }, );   
    return (

        <body>
        <div>
            <div className="background">.</div>
            <div>
                <img id="pfp_dd" width="200" height="200" class="rounded-circle"
                    alt="pfp"
                    src={pfps[form.profilePicture]}/>
            </div>
            <div className="info">
                Name: {form.name}
            </div>
            <div className="info">
                @{form.username}
            </div>
            <div className="bio">
                Bio: {form.userDescription}
            </div>
            <a href='./editprofile'>
                <button className="edit-link">Edit Profile</button>
            </a>

        </div>
        </body>
    )
}

export default ProfileScreen;
