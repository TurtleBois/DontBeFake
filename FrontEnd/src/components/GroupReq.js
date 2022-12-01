import "../styles/Users.css"
import "../styles/Requests.css"
import React, {useState, useEffect} from "react";
import e from "cors"


const GroupReq = (props) => {
    
    const [userGroups, setUserGroups] = useState(null);
    const [requests, setRequests] = useState(null);


    useEffect(() => {
        async function getUserGroups() {
        var DBF_username = localStorage.getItem("DBF_username");
        if(DBF_username == null) {
            // this should NEVER happen
            DBF_username = "chang";
        }
        const response = await fetch(`http://localhost:5000/profile/`);
    
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const records = await response.json();
        var joinedGroups = [];
        for(var record of records) {
            if(record.username === DBF_username) {
                joinedGroups = record.joinedGroups;
                break;
            }
        }
        const groupResponse = await fetch(`http://localhost:5000/group/`);
        if (!groupResponse.ok) {
            const message = `An error occurred: ${groupResponse.statusText}`;
            window.alert(message);
            return;
        }
        const groups = await groupResponse.json();
        var groupNamesAndIDs = [];
        for(var group of groups) {
            for(var joinedGroup of joinedGroups) {
                if(group["groupID"] === joinedGroup) {
                    var bundle = {id: joinedGroup, name: group["groupName"]};
                    groupNamesAndIDs.push(bundle);
                    break;
                }
            }
        }

        setUserGroups(groupNamesAndIDs);
        const getRequest = await fetch(`http://localhost:5000/group/${props._id}`);
        if (!groupResponse.ok) {
            const message = `An error occurred: ${groupResponse.statusText}`;
            window.alert(message);
            return;
        }
        const currGroup = await getRequest.json();

        setRequests(currGroup.requests);
        }
        getUserGroups();

     }, [])

     if(userGroups == null || requests == null) {
        return;
     }
     var icon = 0
     for (let i = 0; i < userGroups.length; i++) {
        if(userGroups[i].id === props.id)
        {
            icon = 1
            break;
        }
     }
     var requested = [];
     for(const [index,element] of requests.entries()) {
         requested.push(element.username);
     }
     console.log(props.name)
     console.log(requested);

     if(requested.includes(localStorage.getItem("DBF_username"))) {
        icon = 2;
     }

     
     async function sendRequest() {
        const groupResponse = await fetch(`http://localhost:5000/group/${props._id}`);
        if (!groupResponse.ok) {
            const message = `An error occurred: ${groupResponse.statusText}`;
            window.alert(message);
            return;
        }
        const group = await groupResponse.json();
        
        var requestList = group.requests;

        //check for duplicate request sends
        if(requestList != null) {
            var requested = [];
            for(const [index,element] of requestList.entries()) {
                requested.push(element.username);
            }
            
            if(requested.includes(localStorage.getItem("DBF_username"))) {
                return;
            }
        }
        else {
            requestList = [];
        }
        
        var newRequest = {username: localStorage.getItem("DBF_username"), profileID: localStorage.getItem("DBF_username")};
        requestList.push(newRequest);
        var value = {requests : requestList};
        var newGroup = {...group, ...value};

        
        await fetch(`http://localhost:5000/group/update/${newGroup._id}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newGroup),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        
     }


    if(icon === 0)
    {
        return(
            <body class="user">
                <img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                <div class="user-text">
                    <b><p id="user-name">{props.name} </p></b>
                    <b><p id="user-username">MemberCount: {props.numMembers}</p></b>
                </div>
                <button id="join-button" onClick={() => sendRequest() }><b>Join.</b></button>
            </body>
        )
    }
    else if(icon === 1)
    {
        return(
            <body class="user">
                <img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                <div class="user-text">
                    <b><p id="user-name">{props.name} </p></b>
                    <b><p id="user-username">MemberCount: {props.numMembers}</p></b>
                </div>
                <button id="joined-button" disabled><b>Joined.</b></button>
            </body>
        )
    }
    else if(icon === 2)
    {
        return(
            <body class="user">
                <img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                <div class="user-text">
                    <b><p id="user-name">{props.name} </p></b>
                    <b><p id="user-username">MemberCount: {props.numMembers}</p></b>
                </div>
                <button id="pending-button" disabled><b>Pending.</b></button>
            </body>
        )
    }
}

export default GroupReq;