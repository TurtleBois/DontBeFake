import React from "react";
import "../styles/Friend.css"

const FindMoreGroups = () => {
    return(
        <div class="find-more-friends">
            <a class="fmf-link" href="/search"><img alt="fmf-img" src={require('../assets/plus-sign.png')}/></a>
        </div>
    )
}

export default FindMoreGroups;