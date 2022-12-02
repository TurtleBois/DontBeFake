import '../styles/Events.css';
import React from "react";
import EventDetails from './EventDetails.js';


const Event = (props) => {
    const user_ID = localStorage.getItem("_id");

    async function BeReal() {
        const eventRequest = await fetch(`http://localhost:5000/event/${props.eventID}`);
        if (!eventRequest.ok) {
            const message = `An error occurred: ${eventRequest.statusText}`;
            window.alert(message);
            return;
        }
        // add curr member to the array
        const event = await eventRequest.json();

        var attendingMembers = event.attending;
        attendingMembers.push(user_ID);

        const value = {attending: attendingMembers};
        var updatedEvent = {...event, ...value}; 

        await fetch(`http://localhost:5000/event/update/${props.eventID}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEvent),         
              
        })
        .then( () => {window.location.reload(false);});

        return;
    }
    
    function convertFromJackyTime(time) {
        function indexTo24Hour(index){   
            const thirty = (index%2) ? "30" : "00"
            return (9 + Math.floor(index/2) + ":"+thirty + ":00");
        }
        const intToMonth= ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        
        if(time[0].length == 1) {
            time[0] = "0" + time[0];
        }
        
        if(time[1].length == 1) {
            time[1] = "0" + time[1];
        }
        var prelude = ""+
        time[1]+" "+
        intToMonth[parseInt(time[0])]+" "+
        time[2]+" "
        
        var toReturn = [];
        var startTime = prelude+indexTo24Hour(time[3]);
        var endTime = prelude+indexTo24Hour(time[4]);
        

        toReturn.push(Date.parse(startTime));
        toReturn.push(Date.parse(endTime));
        
        return toReturn;
    }
    var altTime = convertFromJackyTime(props.time);

    async function generateGroupID(length) {
        var result = "";
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        var charLength = chars.length;
        for ( var i = 0; i < length; i++ ) {
            result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }

    async function Vote() {
        console.log(props);
        var groupID = window.location.href.split("=")[1].split("/")[0];

        const eventRequest = await fetch(`http://localhost:5000/event/${props.eventID}`);
        if (!eventRequest.ok) {
            const message = `An error occurred: ${eventRequest.statusText}`;
            window.alert(message);
            return;
        }
        // add curr member to the array
        const event = await eventRequest.json();
        const electionID = await generateGroupID(13);

        var voters = [];
        var candidates = [];
        for(var person of props.attending) {
            voters.push([person,false]);
            candidates.push([person,0]);
        }

        console.log(event);
        if(event.votingPointer == null) {
            var newVotingPointer = {
                groupID: groupID,
                eventID: props.eventID,
                electionID: electionID,
                voters: voters,
                beFakeCandidates: candidates,
            }
            
            
            await fetch("http://localhost:5000/vote/add", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newVotingPointer),
            })
            .catch(error => {
                window.alert(error);
                return;
            });

            const request = await fetch(`http://localhost:5000/vote`);
            if (!eventRequest.ok) {
                const message = `An error occurred: ${eventRequest.statusText}`;
                window.alert(message);
                return;
            }
            const ballots = await request.json();
            var freshlink = "";
            for(var ballot of ballots) {
                if(ballot.electionID == electionID) {
                    freshlink = ballot._id;
                    var value = {votingPointer: ballot._id};
                    var updatedEvent =  {...event, ...value};
                    console.log(updatedEvent);
                    await fetch(`http://localhost:5000/event/update/${props.eventID}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedEvent),         
                        
                    })
                    .then( () => window.location.replace('/voting='+freshlink) )
                    ;
                    break;
                }
            }
        }
        else {
            window.location.replace('/voting='+event.votingPointer);
        }


    }
    if(props.attending.includes(user_ID)) {
        return (
            <div className="content-container">
                <div className="event-content">
                    {/* <div id="box" className="box-date">
                    <p>
                        {props.day} <br />{props.month}
                    </p>
                    </div> */}
                    <EventDetails
                    day = {props.day}
                    month = {props.month}
                    name = {props.eventName}
                    beginTime = {altTime[0]}
                    endTime = {altTime[1]}
                    location = {props.location}
                    description = {props.description}
                    id = {props.eventID}
                    attending = {props.attending}

                    />
                        <div className="content-box">
                        <p>
                            <div id="content" className="title-font">
                                {props.eventName}
                            </div>
                            <div id="content" className="text">
                                About: {props.description}
                            </div>
                            <button id="befake-button" onClick={() => Vote() }><b>Vote.</b></button>
                        </p>
                    </div>
                </div>
            </div>
        )

    }

    
    return (
        <div className="content-container">
            <div className="event-content">
                    <EventDetails
                    day = {props.day}
                    month = {props.month}
                    name = {props.eventName}
                    beginTime = {props.time[0]}
                    endTime = {props.time[1]}
                    location = {props.location}
                    description = {props.description}
                    id = {props.eventID}
                    attending = {props.attending}
                    />
                <div className="content-box">
                    <p>
                        <div id="content" className="title-font">
                            {props.eventName}
                        </div>
                        <div id="content" className="text">
                            About: {props.description}
                        </div>
                        <button id="bereal-button"><b>Voting Expired.</b></button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Event;