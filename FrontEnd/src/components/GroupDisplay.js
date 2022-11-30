import React from "react";
import "../styles/GridDisplay.css"

const Friend = (props) => {
    console.log(props);
    var link = "/group="  + props.name
    return(
        <body class="groupDisplay">
            {/* /friendprofile is temporary link */}

            
            <div class="groupDisplay-text">
                <a href={link} class="groupDisplay-link"><b><p id="groupDisplay-name">{props.name}</p></b></a>
                <a href={link} class="groupDisplay-link"><img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/></a>
                

            </div>
        </body>
    )
}

export default Friend;