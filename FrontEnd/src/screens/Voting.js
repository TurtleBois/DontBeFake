import React from "react";
import "../styles/Voting.css"
import GroupMate from "../components/GroupMate";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const VotingScreen = () => {
    var numOfGroupMates = 5;
    var groupMatesAlign = "right";
    return (
        <div>
            <Box mt={6} mb={6} ml={10} mr={2}> 
                <Grid container columns={12} rowSpacing={6}>
                    {Array.from(Array(numOfGroupMates)).map((_, index) => {
                        {/* Sets alignment for friend at index. */}
                        if (index % 2 === 0) {
                            groupMatesAlign = "right" 
                        } else {
                            groupMatesAlign = "center" 
                        } 
                        {/* Makes Grid item for Friend at index. */}
                        return (
                            <Grid item sm={6} key={index} align={groupMatesAlign} style={{ maxWidth: '100%'}}>
                                <GroupMate/>
                            </Grid> 
                        )  
                    })}
                </Grid>
            </Box>
        </div>
    )
}

export default VotingScreen;