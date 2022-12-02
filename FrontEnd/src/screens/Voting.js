import React from "react";
import "../styles/Voting.css"
import GroupMate from "../components/GroupMate";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


const minimumVotePercentage = 0.01;


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
            numVotes: 0,
            
        }
        this.init();
    }

    registerVote= (targetId, isFake, first) => {
        console.log("voted:" + targetId + " as " + isFake)
        const candidates = this.state.candidates.slice();
        const hasVoted = this.state.hasVoted.slice();
        

        if(first)
        {
            this.setState({numVotes: this.state.numVotes+ 1});
        }
        // console.log(candidates[0])
        for(let i = 0; i < candidates.length; i++)
        {
            // console.log(candidates[i])
            if(targetId == candidates[i][0])
            {
                if(isFake) {
                    candidates[i][1]++;
                }
            }
            if(localStorage.getItem("_id") == hasVoted[i][0]) {
                hasVoted[i][1] = true;
            }
        }
        
        this.setState({candidates: candidates, hasVoted : hasVoted}, ()=> {console.log(this.state.candidates)});

    }

    handleSubmit = () =>
    {
        var votesRequired = this.state.candidates.length;

        for(var profile of this.state.profiles) {
            if(profile.username == localStorage.getItem("DBF_username")) {
                votesRequired--;
                break;
            }
        }
        if(this.state.numVotes < votesRequired)
        {
            alert("you have not finished voting");
            return;
        }
        this.submitVote();
    }

    async submitVote() {
        
        var voterID = window.location.href.split("=")[1].split("/")[0];
        const request = await fetch(`http://localhost:5000/vote/${voterID}`);
        if (!request.ok) {
            const message = `An error occurred: ${request.statusText}`;
            window.alert(message);
            return;
        }
        var ballot = await request.json();
        
        const request2 = await fetch(`http://localhost:5000/group`);
        if (!request2.ok) {
            const message = `An error occurred: ${request2.statusText}`;
            window.alert(message);
            return;
        }
        var groups = await request2.json();

        var currentGroup = null;
        for(var group of groups) {
            if(group.groupID == this.state.ballot.groupID) {
                currentGroup = group;
                break;
            }
        }
        const numMembers = currentGroup.members.length;

        var fakeList = [];
        for(var candidate of this.state.ballot.beFakeCandidates) {
            if(candidate[1] / numMembers > minimumVotePercentage) {
                fakeList.push(candidate[0]);
            }
        }

        var fakeListUsernames = [];
        for(var id of fakeList) {
            const request3 = await fetch(`http://localhost:5000/profile/${id}`);
            if (!request3.ok) {
                const message = `An error occurred: ${request3.statusText}`;
                window.alert(message);
                return;
            }
            var profile = await request3.json();
            fakeListUsernames.push(profile.username);
        }


        for(var member of currentGroup.members) {
            if(fakeListUsernames.includes(member["DBF_username"])) {
                member["fakeStatus"] = true;
                console.log(member);
                var toReturn = {
                    groupID: currentGroup.groupID,
                    defendent: member["DBF_username"],
                    voted: [],
                    unfakeVotes: 0,
                };
                
                await fetch(`http://localhost:5000/trial/add/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(toReturn),         
                })
                
            }
        }
        
        await fetch(`http://localhost:5000/group/update/${currentGroup._id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentGroup),         
        });

        await fetch(`http://localhost:5000/vote/update/${this.state.ballot._id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.ballot),         
        })
        .then( () => {        
        var groupID = window.location.href.split("=")[1].split("/")[0];
        var prefix = "/group=" + groupID + "/events/past";
        window.location.href=prefix;
        });
        
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
                // console.log(this.state);
            });

    }

    
    
    render()
    {
        // console.log(this.state.profiles[0].)
        var numOfAttendees = this.state.candidates.length;
        var groupMatesAlign = "right";
        return (
        <div>
            <Box pt={3.5} pb={3.5} ml={7} mr={7}> 
                <Grid container columns={12} rowSpacing={5}>
                    {Array.from(Array(numOfAttendees)).map((_, index) => {
                        if(this.state.profiles[index].username == localStorage.getItem("DBF_username")) {
                            return;
                        }
                        {/* Sets alignment for groupmate at index. */}
                        if (index % 2 === 0) {
                            groupMatesAlign = "right" 
                        } else {
                            groupMatesAlign = "center" 
                        } 
                        {/* Makes Grid item for groupmate at index. */}
                        console.log(this.state);
                        return (
                            
                            <Grid item sm={6} key={index} align={groupMatesAlign} style={{ maxWidth: '100%'}}>
                                <GroupMate
                                    userID = {this.state.profiles[index]._id}
                                    name = {this.state.profiles[index].name}
                                    username = {this.state.profiles[index].username}
                                    registerVote = {this.registerVote}
                                    
                                />
                            </Grid> 
                        )  
                    })}
                </Grid>
                <button id="vote-button" onClick={this.handleSubmit}><b>Vote.</b></button>
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