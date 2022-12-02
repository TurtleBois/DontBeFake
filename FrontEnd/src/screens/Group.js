import React from "react";
import Friend from "../components/Friends";
import FindMoreFriends from "../components/FindMoreFriends";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import '../styles/group.css';
import pencil from '../assets/pencil-transparent.png';
import copy from '../assets/copy.png';

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

    for (var member of members) {
        for(var profile of profiles) {
            if(profile.username == member["DBF_username"]) {
                groupMembers.push(profile);
            }
        }
    }

    return groupMembers;
    
}

class Group extends React.Component {
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
            window.location.href="/viewgroup";
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
        console.log(this.state.memberProfiles);
        var editLink = "/editgroup=" + this.state.groupID;
        return (
            <div>
            <a className="title" >{this.state.groupName}. </a>
                {/* <button className="button" onClick={event =>  window.location.href=editLink}> pencil</button>  */}
                <a href={editLink} className="edit-button"><img id="edit-group" src={pencil}></img></a>
                <div className="group-id">GroupID:{this.state.groupID}
                    <button class="copy-button" onClick={event => {
                        navigator.clipboard.writeText(this.state.groupID)
                    }}>
                        <img id="copy-id" src={copy}></img></button>
                </div>
                <Box mt={6} mb={6} ml={10} mr={10}> 
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
                            return (
                                <Grid item sm={6} key={index} align={friendAlign} style={{ maxWidth: '100%'}}>
                                    <Friend 
                                    name={this.state.memberProfiles[index]["name"]}
                                    username={"@"+  this.state.memberProfiles[index]["username"]}
                                    role = {this.state.memberRoles[index]["role"]}
                                    profilePicture = {this.state.memberProfiles[index]["profilePicture"]}
                                    bio = {this.state.memberProfiles[index]["userDescription"]}
                                    status={this.state.memberRoles[index]["fakeStatus"]}
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
export default Group;