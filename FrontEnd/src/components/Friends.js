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
            <a href="/friendprofile" class="friend-link"><img alt="pfp" src={pfps[pfpID]}/></a>
            <div class="friend-text">
                <a href="/friendprofile" class="friend-link"><b><p id={nameID}>{name}</p></b></a>
                <a href="/friendprofile" class="friend-link"><b><p id="friend-username">{props.username}</p></b></a>
                
            </div>
        </body>
    )
}

export default Friend;