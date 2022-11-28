import React, { useState, useEffect, Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

import '../styles/Profile.css';

const ProfileScreen = () => {

    //TODO: redirect user to login page if they are not signed in (aka don't display profile unless a user is actually logged in)

    const [form, setForm] = useState({  
        username: localStorage.getItem("DBF_username"), 
        name: localStorage.getItem("name") == "undefined" ? "" : localStorage.getItem("name"),
        profilePicture: localStorage.getItem("profilePicture") == "undefined" ? "" : localStorage.getItem("profilePicture"),
        userDescription: localStorage.getItem("userDescription") == "undefined" ? "" : localStorage.getItem("userDescription"),
    });

    return (

        <body>
        <div>
            <div className="background">.</div>
            <div>
                <img id="pfp_dd" width="200" height="200" class="rounded-circle"
                    alt="pfp"
                    src={form.profilePicture}/>
            </div>
            <div className="info">
                Name: {form.name}
            </div>
            <div className="info">
                Username: {form.username}
            </div>
            <div className="bio">
                Bio: {form.userDescription}
            </div>
            <a href='./CreateProfileTest'>
                <button className="edit-link">Edit Profile</button>
            </a>
            

        </div>
        </body>
    )
}

export default ProfileScreen;
