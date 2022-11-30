import React from "react";
import Friend from "../components/Friends";
import FindMoreFriends from "../components/FindMoreFriends";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const MyFriendsScreen = () => {
    var numOfFriends = 5;
    var friendAlign = "right";
    var fmfAlign = "center";
    return (
        <div>
            <Box pt={3.5} pb={3.5} ml={10} mr={2}> 
                <Grid container columns={12} rowSpacing={5}>
                    {Array.from(Array(numOfFriends)).map((_, index) => {
                        {/* Sets alignment for FindMoreFriends component. */}
                        if (numOfFriends % 2 === 0) {
                            fmfAlign = "right" 
                        } else {
                            fmfAlign = "center" 
                        }
                        {/* Sets alignment for friend at index. */}
                        if (index % 2 === 0) {
                            friendAlign = "right" 
                        } else {
                            friendAlign = "center" 
                        } 
                        {/* Makes Grid item for Friend at index. */}
                        return (
                            <Grid item sm={6} key={index} align={friendAlign} style={{ maxWidth: '100%'}}>
                                <Friend name={"Powell Cat"}/>
                            </Grid> 
                        )  
                    })}
                    {/* Makes Grid item for FindMoreFriends. */}
                    <Grid item sm={6} align={fmfAlign} style={{maxWidth: '100%'}}>
                        <FindMoreFriends/>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default MyFriendsScreen;