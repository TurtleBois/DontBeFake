import React, { Component, useState } from "react";
import "../styles/MyFriends.css";
import Friend from "../components/Friends";
import FindMoreFriends from "../components/FindMoreFriends";
import Grid from '@mui/material/Grid';

const MyFriendsScreen = () => {
    return (
        <div>
            <Friend/>
            <FindMoreFriends/>
        </div>
    )
}

export default MyFriendsScreen;