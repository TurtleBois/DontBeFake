import React from "react";
import "../styles/Friend.css"

const Friend = (props) => {
    var nameID = "friend-name";
    var name = props.name;
    if(props.role == "leader") {
        nameID = "leader-name";
        name+="👑";
    }

    return(
        <body class="friend">
            {/* /friendprofile is temporary link */}
            <a href="/friendprofile" class="friend-link"><img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/></a>
            <div class="friend-text">
                <a href="/friendprofile" class="friend-link"><b><p id={nameID}>{name}</p></b></a>
                <a href="/friendprofile" class="friend-link"><b><p id="friend-username">{props.username}</p></b></a>
            </div>
        </body>
    )
}

export default Friend;