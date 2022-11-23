import React from "react";
import "../styles/Friend.css"

const FindMoreFriends = () => {
    return(
        <div class="find-more-friends">
            <a class="fmf-link" href="/search"><img alt="fmf-img" src={require('../assets/plus-sign.png')}/></a>
            <a class="fmf-link" href="/search"><b><p id="find-more-friends-text">Find more friends</p></b></a>
        </div>
    )
}

export default FindMoreFriends;