import React from "react";
import "../styles/Users.css"

const User = () => {
    return(
        <body class="user">
            {/* /friendprofile is temporary link */}
            <a href="/friendprofile" class="friend-link"><img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/></a>
            <div class="user-text">
                <a href="/friendprofile" class="friend-link"><b><p id="user-name">Powell Cat</p></b></a>
                <a href="/friendprofile" class="friend-link"><b><p id="user-username">campuscat</p></b></a>
            </div>
        </body>
    )
}

export default User;