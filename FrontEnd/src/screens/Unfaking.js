

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import '../styles/Unfake.css';
import face_default from "../assets/face_default.png";
import face_happy from "../assets/face_happy.png";
import face_ditto from "../assets/face_ditto.png";
import face_angry from "../assets/face_angry.png";
import face_winky from "../assets/face_winky.png";
import face_XD from "../assets/face_XD.png";
const pfps = [face_default,face_happy,face_ditto,face_angry,face_winky,face_XD];

const minimumFakeRatio = 0.01;

const Unfaking = () => {
    const defendent = window.location.href.split('/')[4];
    const [trialData, setTrialData] = useState(null);
    useEffect(() => {
        async function getUserGroups() {
            const response = await fetch("http://localhost:5000/trial/");
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
              }
              const trials = await response.json();
              var currentTrial = null;
              for(var trial of trials) {
                if(trial.defendent == defendent) {
                    currentTrial = trial;
                    break;
                }
              }
              const response2 = await fetch("http://localhost:5000/profile/");
              if (!response2.ok) {
                  const message = `An error occurred: ${response2.statusText}`;
                  window.alert(message);
                  return;
                }
              const profiles = await response2.json();
              for(var profile of profiles) {
                if(profile.username == trial.defendent) {
                    currentTrial["profile"] = profile;
                }
              }

            setTrialData(currentTrial);
        }
        getUserGroups();
     }, [])

     if(trialData == null) {
        return;
     }


async function vote() {
    if(trialData.defendent == localStorage.getItem("DBF_username") ||
        trialData.voted.includes(localStorage.getItem("DBF_username")) )
    {
        return;
    }

    const response = await fetch("http://localhost:5000/group/");
    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const groups = await response.json();
      var currentGroup = null;
      
      for(var group of groups) {
        if(group.groupID == trialData.groupID) {
            currentGroup = group;
            break;
        }
      }
      const numMembers = group.members.length;
      var updatedVoted = trialData.voted;
      updatedVoted.push(localStorage.getItem("DBF_username"));

      trialData["unfakeVotes"]++;
      const value = {voted: updatedVoted};
      const newTrialData = {...trialData, ...value};



      // remove fake tag
      if(trialData["unfakeVotes"] /numMembers > minimumFakeRatio) {
        for(var i = 0; i < numMembers; i++) {
            if(currentGroup.members[i]["DBF_username"] == trialData.defendent) {
                currentGroup.members[i]["fakeStatus"] = false;
                await fetch(`http://localhost:5000/group/update/${currentGroup._id}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(currentGroup),         
                    
                })
                .then( () => window.location.reload(false));
                break;
            }
          }
      }
      else {
        await fetch(`http://localhost:5000/trial/update/${trialData._id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trialData),         
            
        })
        .then( () => window.location.reload(false));
    }
}

if(trialData.defendent == localStorage.getItem("DBF_username") || trialData.voted.includes(localStorage.getItem("DBF_username")) ) {
    return (
        <body>
        <div>
            <div className="trial-title">Vote. </div>
            <div className="background">.</div>
                <img id="pfp_dd" width="200" height="200" class="rounded-circle"
                        alt="pfp"
                src={pfps[trialData.profile.profilePicture]}/>
                <div className="defendent-text">
                    {trialData.profile.name}
                </div>
                <button class="vote-button" >Voted.</button>
            </div>
            
        </body>
    )
}
return (
    <body>
    <div>
        <div className="trial-title">Vote. </div>
        <div className="background">.</div>
            <img id="pfp_dd" width="200" height="200" class="rounded-circle"
                    alt="pfp"
            src={pfps[trialData.profile.profilePicture]}/>
            <div className="defendent-text">
                {trialData.profile.name}
            </div>
            <button class="vote-button" onClick= {() => vote()}>Unfake.</button>
        </div>
        
    </body>
)
}

export default Unfaking;


