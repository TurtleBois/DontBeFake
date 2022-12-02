import React from "react";
import "../styles/Friend.css"
import face_default from "../assets/face_default.png";
import face_happy from "../assets/face_happy.png";
import face_ditto from "../assets/face_ditto.png";
import face_angry from "../assets/face_angry.png";
import face_winky from "../assets/face_winky.png";
import face_XD from "../assets/face_XD.png";
const pfps = [face_default,face_happy,face_ditto,face_angry,face_winky,face_XD];

const Friend = (props) => {
    console.log(props);
    var pfpID = (props.profilePicture === "") ? 0 : props.profilePicture;
    var name = props.name;
    var styleID = "friend-name";
    var userStyleID = "friend-username";
    var bioStyleID = "friend-bio";

    if(props.role == "leader") {
        styleID = "leader-name";
        name+="👑";
    }

    /* check if leader first, then if leader is fake, overwrites css style to red */

    if(props.status == true) {
        styleID = "red-name";
        name = "[Fake.] " + name;
        userStyleID = "red-username";
        bioStyleID = "red-bio";
    }

    /* check if leader first, then if leader is fake, overwrites css style to red */

    if(props.status == true) {
        styleID = "red-name";
        name = "[Fake.] " + name;
        userStyleID = "red-username";
        bioStyleID = "red-bio";
    }

    return(
        <body class="friend" >
            <img alt="pfp" src={pfps[pfpID]}/>
            <div class="friend-text">
                <b><p id={styleID}>{name}</p></b>
                <b><p id={userStyleID}>{props.username}</p></b>
                <p id={bioStyleID}>{props.bio}</p>
                
            </div>
        </body>
    )
}

export default Friend;