import React from "react";
import "../styles/MiniNav.css"
import { Link } from "react-router-dom";

const MiniNav = () => {
    return (
        // Temporary links. Change later.
        <div class="mini-nav">
            <Link to={"/calendar"}><button><b>Heatmap</b></button></Link>
            <Link to={"/voting"}><button><b>Members</b></button></Link>
            <Link to={"/invites"}><button><b>Invites</b></button></Link>
            <Link to={"/voting"}><button><b>Voting</b></button></Link>
            <Link to={"/events"}><button><b>Events</b></button></Link>
        </div>
    )
}

export default MiniNav;