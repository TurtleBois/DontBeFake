import React from "react";
import "../styles/Voting.css"
import GroupMate from "../components/GroupMate";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



class VotingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventID: "",
            groupID: "",
            candidates: [],
            hasVoted: [],
            ballot: null,
            profiles: [],
        }
        this.init();
    }

    async init() {
        var voterID = window.location.href.split("=")[1].split("/")[0];
        const request = await fetch(`http://localhost:5000/vote/${voterID}`);
        if (!request.ok) {
            const message = `An error occurred: ${request.statusText}`;
            window.alert(message);
            return;
        }
        const ballot = await request.json();

        var profiles = [];
        for(var voter of ballot.voters) {
            const request = await fetch(`http://localhost:5000/profile/${voter[0]}`);
            if (!request.ok) {
                const message = `An error occurred: ${request.statusText}`;
                window.alert(message);
                return;
            }
            const profile = await request.json();
            profiles.push(profile);
        }
        
        this.setState({
            eventID: ballot.eventID,
            groupID: ballot.groupID,
            candidates: ballot.beFakeCandidates,
            hasVoted: ballot.voters,
            profiles: profiles,
            ballot: ballot,
            },
            () => {
                this.render();
                console.log(this.state);
            });

    }
    render()
    {
        var numOfAttendees = this.state.candidates.length;
        var groupMatesAlign = "right";
        return (
        <div>
            <Box pt={3.5} pb={3.5} ml={7} mr={7}> 
                <Grid container columns={12} rowSpacing={5}>
                    {Array.from(Array(numOfAttendees)).map((_, index) => {
                        {/* Sets alignment for groupmate at index. */}
                        if (index % 2 === 0) {
                            groupMatesAlign = "right" 
                        } else {
                            groupMatesAlign = "center" 
                        } 
                        {/* Makes Grid item for groupmate at index. */}
                        return (
                            <Grid item sm={6} key={index} align={groupMatesAlign} style={{ maxWidth: '100%'}}>
                                <GroupMate
                                    name = {this.state.profiles[index].name}
                                    username = {this.state.profiles[index].username}
                                />
                            </Grid> 
                        )  
                    })}
                </Grid>
                <button id="vote-button"><b>Vote.</b></button>
            </Box>
        </div>
        )
    }
}




// const VotingScreen = () => {
//     var numOfGroupMates = 5;
//     var groupMatesAlign = "right";
//     return (
//         <div>
//             <Box pt={3.5} pb={3.5} ml={7} mr={7}> 
//                 <Grid container columns={12} rowSpacing={5}>
//                     {Array.from(Array(numOfGroupMates)).map((_, index) => {
//                         {/* Sets alignment for groupmate at index. */}
//                         if (index % 2 === 0) {
//                             groupMatesAlign = "right" 
//                         } else {
//                             groupMatesAlign = "center" 
//                         } 
//                         {/* Makes Grid item for groupmate at index. */}
//                         return (
//                             <Grid item sm={6} key={index} align={groupMatesAlign} style={{ maxWidth: '100%'}}>
//                                 <GroupMate/>
//                             </Grid> 
//                         )  
//                     })}
//                 </Grid>
//                 <button id="vote-button"><b>Vote.</b></button>
//             </Box>
//         </div>
//     )
// }

export default VotingScreen;