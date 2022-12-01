import Events from '../styles/Events.css';
import React from "react";
import Event from "../components/Event.js";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import greyBox from '../assets/greyBox.png';

const PastEventsScreen = () => {
    var groupID = window.location.href.split("=")[1].split("/")[0];
    var prefix = "/group=" + groupID;
    var numOfEvents = 4;
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
                                eventName="SomeEvent."
                                day="20"
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
}

export default PastEventsScreen;