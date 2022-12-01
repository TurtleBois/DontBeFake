import '../styles/Events.css';
import React from "react";
import EventDetails from './EventDetails.js';


const Event = (props) => {
    console.log(props);
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

    async function BeFake() {
        const eventRequest = await fetch(`http://localhost:5000/event/${props.eventID}`);
        if (!eventRequest.ok) {
            const message = `An error occurred: ${eventRequest.statusText}`;
            window.alert(message);
            return;
        }
        // add curr member to the array
        const event = await eventRequest.json();

        var attendingMembers = event.attending;
        var index = attendingMembers.indexOf(user_ID);
        attendingMembers.splice(index,1);

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

    }


    // console.log(props.attending);
    if(props.attending.includes(user_ID)) {
        const deterents = ["BeFake.","TheyNeedYou.","Drop.","Quit.","Abandon.","Flake.","Desert."];
        var index = Math.floor(Math.random() * deterents.length);
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
                    beginTime = {props.time[0]}
                    endTime = {props.time[1]}
                    location = {props.location}
                    description = {props.description}
                    id = {props.eventID}

                    />
                        <div className="content-box">
                        <p>
                            <div id="content" className="title-font">
                                {props.eventName}
                            </div>
                            <div id="content" className="text">
                                About: {props.description}
                            </div>
                            <button id="befake-button" onClick={() => BeFake() }><b>{deterents[index]}</b></button>
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
                    />
                <div className="content-box">
                    <p>
                        <div id="content" className="title-font">
                            {props.eventName}
                        </div>
                        <div id="content" className="text">
                            About: {props.description}
                        </div>
                        <button id="bereal-button" onClick={() => BeReal() }><b>BeReal.</b></button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Event;