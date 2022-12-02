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
    var pfpID = (props.profilePicture == "") ? 0 : props.profilePicture;
    var nameID = "friend-name";
    var name = props.name;
    if(props.role == "leader") {
        nameID = "leader-name";
        name+="👑";
    }

    return(
        <body class="friend" >
            {/* /friendprofile is temporary link */}
            <img class="friend-link" alt="pfp" src={pfps[pfpID]}/>
            <div class="friend-text">
                <b><p class="friend-link" id={nameID}>{name}</p></b>
                <b><p class="friend-link" id="friend-username">{props.username}</p></b>
                
            </div>
        </body>
    )
}

export default Friend;