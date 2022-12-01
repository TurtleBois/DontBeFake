import React from "react";
import EditMember from "../components/EditMember";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import '../styles/group.css';
import e from "cors";



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
            kickedMembers: [],
        }
        this.init();
    }

    handleChangeName = (event) => 
    {
        this.setState({groupName: event.target.value})
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


    callbackFunctionKick = (userID) => {
        const kickedMembers = this.state.kickedMembers.slice();
        kickedMembers.push(userID.substring(1));
        this.setState({kickedMembers: kickedMembers}, 
            //() => console.log(this.state.kickedMembers)
            );
    }

    callbackFunctionRevive = (userID) => {
        const kickedMembers = this.state.kickedMembers.slice();
        
        for(let i = 0; i < kickedMembers.length; i++)
        {
            if(kickedMembers[i] === userID.substring(1))
            {
                kickedMembers.splice(i, 1);
                break;
            }
        }
        this.setState({kickedMembers: kickedMembers})
    }

    inKicked = (username) => {
        for(var user of this.state.kickedMembers)
        {
            if(user === username)
            {
                return true;
            }
        }
        return false;
    }

    async kickMembers() {
        var tokick = this.state.kickedMembers;
        // remove the group from each person
        const response = await fetch("http://localhost:5000/profile/");
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
        const profiles = await response.json();
        
        var profilesToEdit = [];
        for(var profile of profiles) {
            if(tokick.includes(profile.username)) {
                profilesToEdit.push(profile);
            }
        }
        for(var profile of profilesToEdit) {
            var value = profile["joinedGroups"];
            var index = value.indexOf(this.state.groupID);
            if(index <-1 ) {
                // THIS SHOULD NEVER HAPPEN
                return;
            }
            value.splice(index,1);
            value = {"joinedGroups" : value};
            var newProfile = {...profile, ...value};
            
            await fetch(`http://localhost:5000/profile/update/${profile._id}`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newProfile),
            })
            .catch(error => {
                window.alert(error);
                return;
            });
            
        }
        var currGroup = await getGroup(this.state.groupID);
        var allMembers = currGroup["members"];
        var updatedMemberList = [];
        for(var member of allMembers) {
            if(!tokick.includes(member.DBF_username)) {
                updatedMemberList.push(member);
            }
        }
        var value = {members: updatedMemberList};
        var updatedGroup = {...currGroup, ...value};
        
        
        await fetch(`http://localhost:5000/group/update/${currGroup._id}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedGroup),
        })
        .catch(error => {
            window.alert(error);
            return;
        }).then( () => window.location.href="/group="+this.state.groupID);


        
    }
    render() {
        
        return (
            <div>
            <input className="title"   placeholder = "GroupTitle." value = {this.state.groupName} onChange = {this.handleChangeName} />
            {/* <div className="title">{this.state.groupName}. </div> */}
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
                                    <EditMember 
                                    name={this.state.memberProfiles[index]["name"]}
                                    username={"@"+  this.state.memberProfiles[index]["username"]}
                                    role = {this.state.memberRoles[index]["role"]}
                                    parentCallbackKick = {this.callbackFunctionKick}
                                    parentCallbackRevive = {this.callbackFunctionRevive}
                                    kicked = {this.inKicked(this.state.memberProfiles[index]["username"])}

                                    />
                                </Grid> 
                            )  
                        })}
                    </Grid>
                        <button 
                        type="submit" 
                        id="save-button"
                        onClick={(event) => this.kickMembers()}
                        ><b>Save.</b></button>
                </Box>
            </div>
        )   
    }


}
export default EditGroupScreen;
