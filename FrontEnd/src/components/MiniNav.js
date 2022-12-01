import React from "react";
import "../styles/MiniNav.css"
import { Link } from "react-router-dom";

const MiniNav = () => {
    var groupID = window.location.href.split("=")[1].split("/")[0];
    var prefix = "/group=" + groupID;

    return (
        // Temporary links. Change later.
        <div class="mini-nav">
            <Link to={prefix+"/groupcalendar"}><button><b>Heatmap</b></button></Link>
            <Link to={prefix}><button><b>Members</b></button></Link>
            <Link to={prefix+"/invites"}><button><b>Invites</b></button></Link>
            <Link to={prefix+"/voting"}><button><b>Voting</b></button></Link>
            <Link to={prefix+"/events"}><button><b>Events</b></button></Link>
        </div>
    )
}

export default MiniNav;