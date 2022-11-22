import React from "react";
import "../styles/Users.css"

const User = () => {
    return(
        <body class="user">
            <img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
            <div class="user-text">
                <b><p id="user-name"></p>Powell Cat</b>
                <b><p id="user-username">campuscat</p></b>
            </div>
        </body>
    )
}

export default User;