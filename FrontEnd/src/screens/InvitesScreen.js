import React from "react";
import Invite from "../components/Invite";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const InvitesScreen = () => {
    var numOfInvites = 6;
    var fmfAlign = "center";
    var friendAlign = "center";

    return (
        <div>
            <Box pt={3.5} pb={3.5} ml={10} mr={2}> 
                <Grid container columns={12} rowSpacing={5}>
                    {Array.from(Array(numOfInvites)).map((_, index) => {
                        {/* Sets alignment for FindMoreFriends component. */}
                        if (numOfInvites % 2 === 0) {
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
                                <Invite
                                name="GroupName"
                                num="#"
                                />
                            </Grid> 
                        )  
                    })}
                </Grid>
            </Box>
        </div>
    )

    // return(
    //     <div>
    //         <Box pt={3.5} pb={3.5} ml={5} mr={5}>
    //             <Grid container columns={12} rowSpacing={5}>
    //                 {Array.from(Array(numOfInvites).map((_,index) => {
    //                     return(
    //                         <Grid item sm={6} key={index} align="center" style={{maxWidth: "100%"}}>
    //                             <Invite
    //                                 GroupName="GroupName"
    //                                 numMembers="#"/>
    //                         </Grid>
    //                     );
    //                 }))}
    //             </Grid>
    //         </Box>
    //     </div>
    // )
}

export default InvitesScreen;