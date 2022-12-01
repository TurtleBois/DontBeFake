import React, {useState, useEffect} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import EventTimeSlot from "../components/EventTimeSlot.js";

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
              height: 9}}>
            </Grid>
            {Array.from(Array(28)).map((_, index) => (
                    <Grid key={index} {...{}} minHeight={50}>
                        {timeSide(index)}
                    </Grid>
            ))}
    </Grid>)
}

const HeatMap = () => {
    const currentGroupID = window.location.href.split('=')[1].split("/")[0];
    const [allGroups, setAllGroups] = useState(null);
    //effectively an init
    useEffect(() => {
        async function getAllGroups() {
            const response = await fetch("http://localhost:5000/group/");
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
              }
              const records = await response.json();
              
              var targetRecord = null;
              for(var record of records) {
                  if(record.groupID == currentGroupID) {
                    targetRecord = record;
                    break;
                  }
              }
              var members = [];
              for(var member of record["members"]) {
                members.push(member["DBF_username"]);
              }
            const response2 = await fetch("http://localhost:5000/schedule/");
            if (!response2.ok) {
                const message = `An error occurred: ${response2.statusText}`;
                window.alert(message);
                return;
              }
              const schedules = await response2.json(); 

              var HeatMap = Array(189).fill(0);
              for(var schedule of schedules) {
                if(members.includes(schedule.profileID)) {
                    for(var index = 0; index < 189; index++) {
                        if(schedule.state["setEvents"][index] != null) {
                            HeatMap[index]++;
                        }
                    }
                }
              }
              setAllGroups(HeatMap);
        }
        getAllGroups();

        

     }, [])
    
     if(allGroups == null) {
        return;
     }
     
     const max = allGroups.reduce((a, b) => Math.max(a, b), -Infinity);
    //  console.log(Math.max(max));
     
    
     
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
                        <Grid key={index} {...{ xs: 12/7}} minHeight={50} style={{backgroundColor: "rgba(255, 0, 0, "+ allGroups[index] * (100/max) +"%)"}} >
                            {
                             
                                <EventTimeSlot
                                numEvents = {allGroups[index]}
                                value = {index}
                                heatMap = {allGroups}


                                />
                     
                            }
                            

                        </Grid>
                    
                    ))}


                </Grid>
            </Grid>   
        </Grid>
    );
}


export default HeatMap;
