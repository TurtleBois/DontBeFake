import React from "react";
import "../styles/Friend.css"

const Friend = () => {
    return(
        <div class="friend">
            <img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
            <div class="friend-text">
                <b><p id="friend-name"></p>PowellCat</b>
                <b><p id="friend-username">campuscat</p></b>
                <b><p id="friend-status">"🐈‍⬛"</p></b>
            </div>
        </div>
    )
}

export default Friend;