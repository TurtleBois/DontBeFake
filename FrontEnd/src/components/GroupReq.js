import "../styles/Users.css"
 
import add from "../assets/add_thumbnail.png"
import accept from '../assets/accepted_thumbnail.png'
import pending from '../assets/pending_thumbnail.png'
import React, {useState, useEffect} from "react";



const GroupReq = (props) => {
    
    const [userGroups, setUserGroups] = useState(null);


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

        }
        getUserGroups();

        

     }, [])

     if(userGroups == null) {
        return;
     }
     
     var icon = add
     console.log(userGroups);


     

     for (let i = 0; i < userGroups.length; i++)
     {
        
        console.log(props.id);
        console.log(userGroups[i].id);
        if(userGroups[i].id === props.id)
        {
            icon = accept
            break;
        }

     }
     

    return(
        <body class="user">
            {/* /friendprofile is temporary link */}
            <a href="/friendprofile" class="friend-link"><img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/></a>
            <div class="user-text">
                <a href="/friendprofile" class="friend-link"><b><p id="user-name">{props.name} </p></b></a>
                <a href="/friendprofile" class="friend-link"><b><p id="user-username">MemberCount: {props.numMembers}</p></b></a>
            </div>
            <a> <img id="icon" src={icon}/></a>
          

        </body>
    )
}

export default GroupReq;