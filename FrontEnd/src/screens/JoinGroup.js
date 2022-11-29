import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import '../styles/LogIn.css';


async function generateGroupID(length) {
    var result = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var charLength = chars.length;
    for ( var i = 0; i < length; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    
    // code disabled because of latency issues
    /*
    // prevents duplicates incase someone wins the lottery 10 times in a row

    const response = await fetch(`http://localhost:5000/group/`);
      
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const records = await response.json();
    for (var record of records) {
        if(record.groupID == result) {
            return generateGroupID(length);
        }
    }
    */
    return result;
}

const JoinGroup = () => {
    const navigate = useNavigate();

    async function joinGroup(e) {
        e.preventDefault(); // prevents refresh
        var groupID = document.getElementById("groupIDInput").value;
        // check if 1.) group exists and 2.) person is in the group
        const response = await fetch("http://localhost:5000/group/");
        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }
        const records = await response.json();
        var invalid = true;
        for (var record of records) {
            if(record.groupID == groupID) {
                invalid = false;
                console.log(record.members);
                if(record.members.includes(localStorage.getItem("DBF_username") )) {
                    navigate(`/group=${groupID}`);
                }
                else {
                    alert("You are not part of this group. — DontBeFake.");
                }
            }
        }

        if(invalid) {
            alert("Invalid Group ID — DontBeFake.");
        }
    }

    async function createGroup(e) {
        e.preventDefault(); // prevents refresh
        var groupID = await generateGroupID(12);
        var DBF_username = localStorage.getItem("DBF_username");

        // attach the group to the person's information
        const response = await fetch(`http://localhost:5000/profile/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const records = await response.json();
        for (var record of records) {
            if(record.username == DBF_username) {
                var id = record._id;    
                var value = record.joinedGroups;
                if(value == undefined) {
                    var newArray = [];
                    newArray.push(groupID);
                    value = {joinedGroups: newArray }
                }
                else {
                    var changed = record.joinedGroups;
                    changed.push(groupID);
                    value = {joinedGroups: changed};
                }
                var toReturn = {...record, ...value};
                
                await fetch(`http://localhost:5000/profile/update/${id}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(toReturn),         
                      
            });
                break;
                
            }
        }
        var newGroup = {    
            groupName: "New Group",
            groupID: groupID,
            members: [{DBF_username: DBF_username,role: "leader", fakeStatus: false}], 
            events: [],
        }; 
        await fetch("http://localhost:5000/group/add", {
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
        navigate(`/group=${groupID}`);
    }

    return (
        <body>
        <div>
            <div className="background">.</div>
            <div className="title">JoinAGroup.
            </div>
            <form onSubmit={joinGroup}>
                <div>
                    <input 
                    className= "input-bar" 
                    type="text" 
                    id="groupIDInput" 
                    name="groupID" 
                    placeholder="Insert GroupID."
                    />
                </div>
                <input className="button" type="submit" value="Join."></input>
            </form>
            <form onSubmit={createGroup}>
                <input className="button" type="submit" value="CreateAGroup."></input>
            </form>
        </div>
        </body>
        
    )
}

export default JoinGroup;