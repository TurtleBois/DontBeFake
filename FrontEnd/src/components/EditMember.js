import React from "react";
import "../styles/Friend.css"
import face_default from "../assets/face_default.png";
import face_happy from "../assets/face_happy.png";
import face_ditto from "../assets/face_ditto.png";
import face_angry from "../assets/face_angry.png";
import face_winky from "../assets/face_winky.png";
import face_XD from "../assets/face_XD.png";
const pfps = [face_default,face_happy,face_ditto,face_angry,face_winky,face_XD];


const EditMember = (props) => {
    var pfpID = props.profilePicture == "" ? 0 : props.profilePicture;
    var nameID = "friend-name";
    var name = props.name;
    if(props.role == "leader") {
        nameID = "leader-name";
        name+="👑";
    }


    var callBackKick = () => {
        props.parentCallbackKick(props.username);
    }

    var callBackRevive = () => {
        
        props.parentCallbackRevive(props.username);
    }
    
    if(props.role == "leader") {
        return(
            <body class="friend" >
                <a class="friend-link"><img alt="pfp" src={pfps[pfpID]}/></a>
                <div class="friend-text">
                    <text class="friend-link"><b><p id={nameID}>{name}</p></b></text>
                    <text class="friend-link"><b><p id="friend-username">{props.username}</p></b></text>
                </div>
            </body>
        )
    }

    if(props.kicked)
    {
        return(
            <body class="friend" >
                <a class="friend-link"><img alt="pfp" src={pfps[pfpID]}/></a>
                <div class="kicked-text">
                    <text class="friend-link"><b><p id={nameID}>{name}</p></b></text>
                    <text class="friend-link"><b><p id="friend-username">{props.username}</p></b></text>
                    <button id="kick-button" onClick={(event) => {callBackRevive();}}><b>Cancel.</b></button>
                </div>
            </body>
        )
    }

    return(
        <body class="friend" >
            <a class="friend-link"><img alt="pfp" src={pfps[pfpID]}/></a>
            <div class="friend-text">
                <text class="friend-link"><b><p id={nameID}>{name}</p></b></text>
                <text class="friend-link"><b><p id="friend-username">{props.username}</p></b></text>
                <button id="kick-button" onClick={(event) => {callBackKick();}}><b>Kick.</b></button>
            </div>
        </body>
    )
}

export default EditMember;