import React from "react";
import Friend from "../components/Friends";
import FindMoreFriends from "../components/FindMoreFriends";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import '../styles/group.css';



// these do something i think
var friendAlign = "right";
var fmfAlign = "center";

async function getGroup(id) {
    const response = await fetch("http://localhost:5000/group/");
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const records = await response.json();
    for (var record of records) {
        if(record.groupID == id) {
            return record;
        }
    }
    return null;
}

async function getGroupProfiles(members) {
    
    const response = await fetch("http://localhost:5000/profile/");
    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      
    const profiles = await response.json();
    var groupMembers = [];
    var membersList = [];

    for (var member of members) {
        membersList.push(member["DBF_username"]);
    }

    for(var profile of profiles) {
        if(membersList.includes(profile.username)) {
            groupMembers.push(profile);
        }
    }
    return groupMembers;
    
}



class EditGroupScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            groupID: "",
            numOfMembers: 0,
            groupName:"Loading..",
            memberProfiles:[],
            memberRoles:[],
        }
        this.init();
    }

    async init() {
        var newGroupID = window.location.href.split('=')[1];
        var record = await getGroup(newGroupID);
        if(record == null) {
            // TODO: send to this group does not exist.
        }
        
        var memberProfiles = await getGroupProfiles(record.members);

        this.setState({
            groupID: newGroupID,
            numOfMembers: record.members.length,
            groupName: record.groupName,
            memberProfiles: memberProfiles,
            memberRoles: record.members,
            },
            () => {
                this.render();
            });
    }
    
    
    render() {
        return (
            <div>
            <div className="title">{this.state.groupName}. </div>
                <div className="group-id">GroupID:{this.state.groupID} </div>


                <Box mt={6} mb={6} ml={10} mr={2}> 
                    <Grid container columns={12} rowSpacing={6}>
                        {Array.from(Array(this.state.numOfMembers)).map((_, index) => {
                            {/* Sets alignment for FindMoreFriends component. */}
                            if (this.state.numOfMembers % 2 === 0) {
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
                            var colors = "white";
                            return (
                                <Grid item sm={6} key={index} align={friendAlign} style={{ maxWidth: '100%'}}>
                                    <Friend 
                                    name={this.state.memberProfiles[index]["name"]}
                                    username={"@"+  this.state.memberProfiles[index]["username"]}
                                    role = {this.state.memberRoles[index]["role"]}
                                    />
                                </Grid> 
                            )  
                        })}
                    </Grid>
                </Box>
            </div>
        )   
    }


}
export default EditGroupScreen;
