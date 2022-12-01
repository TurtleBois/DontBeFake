import '../styles/Events.css';
import React from "react";
import Event from "../components/Event.js";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import greyBox from '../assets/greyBox.png';
// import { padding } from '@mui/system';

const EventsScreen = () => {

    var numOfEvents = 4;
    return (
        <body>
            <div>
                <a className="button-text" href= "../events"> UpcomingEvents. </a>
                <a className="button-text" href= "../pastevents"> PastEvents. </a>
            </div>
            <div>
            <Box pt={3.5} pb={3.5} ml={7} mr={7}> 
                <Grid container columns={12} rowSpacing={3}>
                    {Array.from(Array(numOfEvents)).map((_, index) => {
                        return (
                            <Grid item sm={6} key={index} align={"center"} style={{ maxWidth: '100%'}}>
                                <Event
                                eventName="Some Event"
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
