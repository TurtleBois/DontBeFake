import React from "react";
import "../styles/Friend.css"

const EditMember = (props) => {
    var nameID = "friend-name";
    var name = props.name;
    if(props.role == "leader") {
        nameID = "leader-name";
        name+="👑";
    }

    if(props.role == "leader") {
        return(
            <body class="friend" >
                <a class="friend-link"><img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/></a>
                <div class="friend-text">
                    <text class="friend-link"><b><p id={nameID}>{name}</p></b></text>
                    <text class="friend-link"><b><p id="friend-username">{props.username}</p></b></text>
                </div>
            </body>
        )
    }

    return(
        <body class="friend" >
            <a class="friend-link"><img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/></a>
            <div class="friend-text">
                <text class="friend-link"><b><p id={nameID}>{name}</p></b></text>
                <text class="friend-link"><b><p id="friend-username">{props.username}</p></b></text>
                <button id="kick-button" onClick={(event) => console.log(props)}><b>Kick.</b></button>
            </div>
        </body>
    )
}

export default EditMember;