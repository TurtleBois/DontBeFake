
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Slot from "../components/timeSlot";
import ClosedSlot from "../components/closedTimeSlot";

async function getGroup(id) {
    const response = await fetch("http://localhost:5000/group/");
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const records = await response.json();
    for (var record of records) {
        if(record.groupID == id) {
            return record;
        }
    }
    return null;
}


async function getGroupProfiles(members) {
    
    const response = await fetch("http://localhost:5000/profile/");
    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      
    const profiles = await response.json();
    var groupMembers = [];
    var membersList = [];

    for (var member of members) {
        membersList.push(member["DBF_username"]);
    }

    for(var profile of profiles) {
        if(membersList.includes(profile.username)) {
            groupMembers.push(profile);
        }
    }
    return groupMembers;
    
}

function timeSide(index)
{   
    const thirty = (index%2) ? "30" : "00"
    if(9+ Math.floor(index/2) === 12) 
    {
        return "12:" + thirty +"pm"
    }
    if ( 9+ Math.floor( index/2) > 12)
    {
        return (Math.floor(index/2) - 3) + ":" + thirty +"pm"
    }
    return (Math.floor(index/2) + 9) + ":" + thirty +"am"
}

function weekdays()
{   
    return(
    <Grid  minWidth = {100}  container
    direction="row" style={{color: "white"}}>
        <Grid  minHeight={1} xs = {12/7}>
            monday.
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            tuesday.
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            wednesday.
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            thursday.
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            friday.
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            saturday.
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            sunday.
        </Grid>

    </Grid>
    )
}

function dayTimes()
{
    return (<Grid item xs={1}  style={{color: "white"} } container
         direction="column">
            <Grid sx={{
              height: 12}}>
            </Grid>
            {Array.from(Array(28)).map((_, index) => (
                    <Grid key={index} {...{}} minHeight={50.8}>
                        {timeSide(index)}
                    </Grid>
            ))}
    </Grid>)
}

// gets a specific person's calendar, which is current "chang"
async function getInformation() {
    var DBF_username = localStorage.getItem("DBF_username");
    if(DBF_username == null) {
        // this should NEVER happen
        DBF_username = "chang";
    }
    const response = await fetch(`http://localhost:5000/schedule/`);

    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }
    
    const records = await response.json();
    for(var record of records) {
        if(record.profileID === DBF_username) {
            return record;
        }
    }
    return null;
}





const HeatMap = () => {
    var collection = [];
    var newGroupID = window.location.href.split('=')[1];
    var record = getGroup(newGroupID);
    if(record == null) {
         // TODO: send to this group does not exist.
    }
    
    //var memberProfiles = getGroupProfiles(record.members);

    //const response = fetch(`http://localhost:5000/schedule/`);
    //if (!response.ok) {
    //     const message = `An error occurred: ${response.statusText}`;
    //     window.alert(message);
    //     return;
    // }

    // const records = response.json();
    // for(var record of records) {
    // {
    //     for(var member in memberProfiles)
    //     {
    //         if(record.profileID === member.username)
    //         {
    //             collection.push(record['setEvents'])
    //         }
    //     }
    // }

    // }

    return (
        <Grid
        container
        direction="row">
            {dayTimes()}
            <Grid 
            item xs={10.8}
            container
            direction="column"
            spacing = {0}>
    
                {weekdays()}
                <Grid
                container
                spacing={1}
                direction="column"

                maxHeight={1400}
                sx={{
                '--Grid-borderWidth': '1px',
                borderTop: 'var(--Grid-borderWidth) solid',
                borderLeft: 'var(--Grid-borderWidth) solid',
                borderColor: 'rgba(133, 133, 133, 1)',
                '& > div': {
                    borderRight: 'var(--Grid-borderWidth) solid',
                    borderBottom: 'var(--Grid-borderWidth) solid',
                    borderColor: 'rgba(133, 133, 133, 1)',
                },
                    }}> 
                    
                    {Array.from(Array(189)).map((_, index) => (        
                        <Grid key={index} {...{ xs: 12/7}} minHeight={50} style={{backgroundColor: 'red'}} />
                    ))}
                </Grid>
            </Grid>   
        </Grid>
    );
}

class Calender extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            setEvents: Array(189).fill(null),
            eventNames: new Array(),
            startTimes: new Array(),
            endTimes: new Array(),
            numEvents: 0,
        }
        this.firstTime = false;
        this.initCalendar();
        
    }

    // wait for the initilization of the calendar from server
    async initCalendar() {
        var newState = await getInformation();
        if(newState == null) {
            this.firstTime = true;
            return;
        }
        newState = newState.state;
        this.setState({
            eventNames: newState.eventNames,
            //coloring: newState.coloring,
            setEvents: newState.setEvents,
            startTimes: newState.startTimes,
            endTimes: newState.endTimes,
            numEvents: newState.numEvents,
            },
            () => {
                // console.log(this.state);
            });
    }

        render() {

            return (
                <Grid
                container
                direction="row">
                    {dayTimes()}
                    <Grid 
                    item xs={10.8}
                    container
                    direction="column"
                    spacing = {0}>
            
                        {weekdays()}
                        <Grid
                        container
                        spacing={1}
                        direction="column"

                        maxHeight={1400}
                        sx={{
                        '--Grid-borderWidth': '1px',
                        borderTop: 'var(--Grid-borderWidth) solid',
                        borderLeft: 'var(--Grid-borderWidth) solid',
                        borderColor: 'rgba(133, 133, 133, 1)',
                        '& > div': {
                            borderRight: 'var(--Grid-borderWidth) solid',
                            borderBottom: 'var(--Grid-borderWidth) solid',
                            borderColor: 'rgba(133, 133, 133, 1)',
                        },
                            }}> 
                            
                            {Array.from(Array(189)).map((_, index) => (        
                                <Grid key={index} {...{ xs: 12/7}} minHeight={50} style={{backgroundColor: this.state.setEvents[index] === null? 'rgba(90, 52, 52, 0)': "hsl(" + this.state.setEvents[index] *15+ ", 90%, 50%)"} } />
                            ))}
                        </Grid>
                    </Grid>   
                </Grid>
            );
    }
}

export default HeatMap;
