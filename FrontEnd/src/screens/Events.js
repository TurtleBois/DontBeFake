import '../styles/Events.css';
import React, {useState, useEffect} from "react";
import Event from "../components/Event.js";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import greyBox from '../assets/greyBox.png';
// import { padding } from '@mui/system';

const EventsScreen = () => {
    const eventIDs = ["6388cf35e9d534a064721530","6389c60ada8a56d2bf2b63da"];
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
    const intToMonth= ["","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

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
                        if(convertFromJackyTime(allEvents[index].time)[1] > Date.now())
                        return (
                            <Grid item sm={5} key={index} align={"center"} style={{ maxWidth: '100%'}}>
                                <Event
                                eventID = {allEvents[index]._id}
                                eventName={allEvents[index].name}
                                attending={allEvents[index].attending}
                                time={allEvents[index].time}
                                location={allEvents[index].location}
                                description={allEvents[index].description}
                                day={allEvents[index].time[1]}
                                month={intToMonth[parseInt(allEvents[index].time[0])]}
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
