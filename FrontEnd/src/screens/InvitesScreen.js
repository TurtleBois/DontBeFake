import React, { useState, useEffect } from "react";
import Invite from "../components/Invite";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import '../styles/LogIn.css';

const InvitesScreen = () => {
    var groupID = window.location.href.split("=")[1].split("/")[0];
    const [allRequests, setRequests] = useState(null);
    const [group_id, setgGroup_id] = useState(null);
    
    //effectively an init
    useEffect(() => {
        async function getJoinRequests() {
            const response = await fetch("http://localhost:5000/group/");
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
              }
              const groups = await response.json();
              
              var requests = [];
              for(var group of groups) {
                  if(group.groupID == groupID) {
                    requests = group.requests;
                    setgGroup_id(group._id);
                    break;
                  }
              }
              setRequests(requests);
        }
        getJoinRequests();
     }, [])

     if(allRequests == null || group_id == null) {
        return;
     }
    var numOfInvites = allRequests.length;
    return (
        <div>
            {/* if (allRequests.length === 0){
                return(
                <div className = 'title' style={{fontSize: '50px'}}>NoRequests.</div> 
                )
            } */}
            <Box pt={3.5} pb={3.5} ml={7} mr={7}> 
                <Grid container columns={12} rowSpacing={5}>
                    {Array.from(Array(numOfInvites)).map((_, index) => {
                        return (
                            <Grid item sm={12} key={index} align={"center"} style={{ maxWidth: '100%'}}>
                                <Invite
                                name={allRequests[index].name}
                                username={allRequests[index].username}
                                requesterID={allRequests[index].profileID}
                                groupID ={groupID}
                                group_id = {group_id}
                                />
                            </Grid> 
                        )  
                    })}
                </Grid>
            </Box>
        </div>
    )

}

export default InvitesScreen;