import React from "react";
import "../styles/GroupMate.css"

const GroupMate = () => {
    return(
        <body class="groupmate">
            {/* /friendprofile is temporary link */}
            <img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
            <div class="groupmate-text">
                <b><p id="groupmate-name">Powell Cat</p></b>
                <b><p id="groupmate-username">campuscat</p></b>
                <button id="real-button"><b>Real.</b></button>
                <button id="fake-button"><b>Fake.</b></button>
            </div>
        </body>
    )
}

export default GroupMate;