import React from "react";
import "../styles/GridDisplay.css"

const FindMoreGroups = () => {
    return(
        <body class="groupDisplay">
            <div class="groupDisplay-text">
                <a href={"/searchgroups"} class="groupDisplay-link"><b><p id="groupDisplay-name">AddGroup.</p></b></a>
                <a class="groupDisplay-link" href="/searchgroups"><img alt="group-img" src={require('../assets/plus-sign.png')}/></a>
            </div>
        </body>
    )
}

export default FindMoreGroups;