import '../styles/Events.css';
import React, {useState, useEffect} from "react";
import Event from "../components/Event.js";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import greyBox from '../assets/greyBox.png';
// import { padding } from '@mui/system';

const EventsScreen = () => {
    const eventIDs = ["6388945bea9ee291e8fef87f","6388945bea9ee291e8fef87f","6388945bea9ee291e8fef87f","6388945bea9ee291e8fef87f"];
    const [allEvents, setCurrentEvent] = useState(null);


    useEffect(() => {
        async function getUserGroups() {
            var events = [];
            for(var eventID of eventIDs) {
                const response = await fetch(`http://localhost:5000/event/${eventID}`);
                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }
                const event = await response.json();
                events.push(event);
            }
            setCurrentEvent(events);
        }
        getUserGroups();
     }, [])

     if(allEvents == null) {
        return;
     }

    var numOfEvents = allEvents.length;
    var groupID = window.location.href.split("=")[1].split("/")[0];
    var prefix = "/group=" + groupID;
    return (
        <body>
            <div>
                <a className="button-text" href= {prefix+"/events/past"}> PastEvents. </a>
                <a className="button-text" href= {prefix+"/events/future"}> UpcomingEvents. </a>
            </div>
            <div>
            <Box pt={1} pb={2} ml={7} mr={7}> 
                <Grid container columns={10} rowSpacing={3}>
                    {Array.from(Array(numOfEvents)).map((_, index) => {
                        return (
                            <Grid item sm={5} key={index} align={"center"} style={{ maxWidth: '100%'}}>
                                <Event
                                eventID = {allEvents[index]._id}
                                eventName={allEvents[index].name}
                                attending={allEvents[index].attending}
                                time={allEvents[index].time}
                                location={allEvents[index].location}
                                description={allEvents[index].description}
                                day="25"
                                month="DEC"
                                />
                            </Grid> 
                        )  
                    })}
                </Grid>
            </Box>
            </div>
        </body>


    )

    // return(
    //     <div>
    //         <div>
    //             <a className="button-text" href= "../events"> UpcomingEvents. </a>
    //             <a className="button-text" href= "../pastevents"> PastEvents. </a>
    //         </div>
    //         {/* event */}
    //         <div className="content-container">
    //             <div className="event-content">
    //                 <div id="box" className="box-date">
    //                 <p>
    //                     30 <br />NOV
    //                 </p>
    //                 </div>
    //                 <div className="content-box">
    //                     <p>
    //                         <div id="content" className="title-font">
    //                             EventName.
    //                         </div>
    //                         <div id="content" className="text">
    //                             Person 1, Person 2, Person 3
    //                         </div>
    //                     </p>
    //                 </div>
    //             </div>
    //             {/* event */}
    //             <div className="event-content" style={{paddingLeft: 100}}>
    //                 <div id="box" className="box-date">
    //                 <p style={{justifyContent: 'center', alignContent: 'center'}}>
    //                     01 <br />DEC
    //                 </p>
    //                 </div>
    //                 <div className="content-box">
    //                     <p>
    //                         <div id="content" className="title-font">
    //                             EventName.
    //                         </div>
    //                         <div id="content" className="text">
    //                             Person 1, Person 2, Person 3
    //                         </div>
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>

    //         {/* event */}
    //         <div className="content-container">
    //             <div className="event-content">
    //                 <div id="box" className="box-date">
    //                 <p>
    //                     02 <br />DEC
    //                 </p>
    //                 </div>
    //                 <div className="content-box">
    //                     <p>
    //                         <div id="content" className="title-font">
    //                             EventName.
    //                         </div>
    //                         <div id="content" className="text">
    //                             Person 1, Person 2, Person 3
    //                         </div>
    //                     </p>
    //                 </div>
    //             </div>
    //             {/* event */}
    //             <div className="event-content" style={{paddingLeft: 100}}>
    //                 <div id="box" className="box-date">
    //                 <p style={{justifyContent: 'center', alignContent: 'center'}}>
    //                     03 <br />DEC
    //                 </p>
    //                 </div>
    //                 <div className="content-box">
    //                     <p>
    //                         <div id="content" className="title-font">
    //                             EventName.
    //                         </div>
    //                         <div id="content" className="text">
    //                             Person 1, Person 2, Person 3
    //                         </div>
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default EventsScreen;
