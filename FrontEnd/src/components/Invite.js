import "../styles/Invite.css"
import React, {useState, useEffect} from "react";

const Invite = (props) => {

    async function acceptMember() {
        const response = await fetch(`http://localhost:5000/profile/${props.requesterID}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
          
        // update profile
        const profile = await response.json();
        var updateJoinedGroups = profile.joinedGroups;
        updateJoinedGroups.push(props.groupID);
        var value = {joinedGroups : updateJoinedGroups };
        var updatedProfile = {...profile, ...value};
        await fetch(`http://localhost:5000/profile/update/${updatedProfile._id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProfile),         
        })

        // update groups
        const groupResponse = await fetch(`http://localhost:5000/group/${props.group_id}`);
        if (!groupResponse.ok) {
            const message = `An error occurred: ${groupResponse.statusText}`;
            window.alert(message);
            return;
          }
        
        const currentGroup = await groupResponse.json();
        // change requests
        var requests = currentGroup.requests;
        var i = 0;
        for(; i < requests.length; i++) {
            if(requests[i].profileID == props.requesterID) {
                break;
            }
        }
        requests.splice(i,1);
        var value = {requests : requests};
        var updatedGroup = {...currentGroup, ...value};

        //change members
        var members = currentGroup.members;
        members.push({DBF_username: props.username, role: "member", fakeStatus:false});
        value = {members : members};
        updatedGroup = {...currentGroup, ...value};
        
        await fetch(`http://localhost:5000/group/update/${props.group_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedGroup),         
              
        })
        .then( () => {window.location.reload(false);});


    }

    async function rejectMember() {
        const response = await fetch(`http://localhost:5000/group/${props.group_id}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
          
        const currentGroup = await response.json();
        var requests = currentGroup.requests;
        var i = 0;
        for(; i < requests.length; i++) {
            if(requests[i].profileID == props.requesterID) {
                break;
            }
        }
        requests.splice(i,1);
        var value = {requests : requests};
        var updatedGroup = {...currentGroup, ...value};

        await fetch(`http://localhost:5000/group/update/${props.group_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedGroup),         
              
        })
        .then( () => {window.location.reload(false);});
    }





    return(
        /* /friendprofile link temporary, should be changed to be link to group */
        <body className="invite">
            <a href="/friendprofile"><img class="rounded-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/></a>
            <div className="invite-text">
                <p id="group-name"><b>{props.name}</b></p>
                <p id="group-count"><b>@{props.username}</b></p>
            </div>
            <div className="invite-buttons">
                <button id="accept"onClick={() => acceptMember()}><b>Accept.</b></button>
                <button id="reject" onClick={() => rejectMember()}><b>Reject.</b></button>
            </div>
        </body>
        /*TODO: display proper group name and member count as well as functionality of accept and reject buttons*/
    )
}

export default Invite;