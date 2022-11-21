import React from "react";
import "../styles/Friend.css"

const FindMoreFriends = () => {
    return(
        <div class="find-more-friends">
            <img src={require('../assets/plus-sign.png')}/>
            <b><p id="find-more-friends-text">Find more friends</p></b>
        </div>
    )
}

export default FindMoreFriends;