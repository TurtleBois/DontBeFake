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


function getDates()
{
    const d = new Date();
    let day = d.getDay();
    let date = d.getDate(); 
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    
    let dates = Array(7).fill(null);

    for (let i = day; i < 7; i++)
    {
        dates[i] = month +  "/" + date + "/" + year
        d.setDate(d.getDate() + 1)
        date = d.getDate(); 
        month = d.getMonth() + 1;
        year = d.getFullYear();
    }
  

    for (let i = 0; i < day; i++)
    {
        dates[i] = month +  "/" + date + "/" + year
        d.setDate(d.getDate() + 1)
        date = d.getDate(); 
        month = d.getMonth() + 1;
        year = d.getFullYear();
    }
    return dates;
}

function weekdays()
{   
    var dates = getDates();
    

    return(
    <Grid  minWidth = {100}  container
    direction="row" style={{color: "white"}}>
        <Grid  minHeight={1} xs = {12/7}>
            sunday.
            <br></br>
            <strong> {dates[0]}</strong>
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            monday.
            <br></br>
            <strong>{dates[1]}</strong>
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            tuesday.
            <br></br>
            <strong>{dates[2]}</strong>
            
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            wednesday.
            <br></br>
            <strong>{dates[3]}</strong>
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            thursday.
            <br></br>
            <strong>{dates[4]} </strong>
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            friday.
            <br></br>
            <strong>{dates[5]}</strong>
        </Grid>
        <Grid  minHeight={1} xs = {12/7}>
            saturday.
            <br></br>
            <strong>{dates[6]} </strong>
        </Grid>
        

    </Grid>
    )
}

function dayTimes()
{
    return (<Grid item xs={1}  style={{color: "white"} } container
         direction="column">
            <Grid sx={{
              height: 32}}>
            </Grid>
            {Array.from(Array(28)).map((_, index) => (
                    <Grid key={index} {...{}} minHeight={50}>
                        {timeSide(index)}
                    </Grid>
            ))}
    </Grid>)
}



async function getAllGroups() {
    const currentGroupID = window.location.href.split('=')[1].split("/")[0];
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
      return HeatMap; 
}


class Calender extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            allGroups: Array(189).fill(null),
            groupEvents: Array(189).fill(null),
            numEvents: 0,
        }
        this.firstTime = false;
        this.initCalendar();
        
    }
    async initCalendar() {
        var allGroupsReq = await getAllGroups();
        if(allGroupsReq == null) {
            this.firstTime = true;
            return;
        }
        // newState = newState.state;
        this.setState({
            allGroups: allGroupsReq,
            },
            () => {
                console.log(this.state);
            });
    }

     generateGroupID(length) {
        var result = "";
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        var charLength = chars.length;
        for ( var i = 0; i < length; i++ ) {
            result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }


    async uploadToDatabase(newEvent) {

        // upload event
        await fetch("http://localhost:5000/event/add", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
        },
        )
        .catch(error => {
            window.alert(error);
            return;
        });
        
        const response2 = await fetch("http://localhost:5000/event/");
        if (!response2.ok) {
            const message = `An error occurred: ${response2.statusText}`;
            window.alert(message);
            return;
          }
        const events = await response2.json();

        var currEvent = null;
        for(var event of events) {
            console.log(event.eventID, newEvent.eventID);
            if(event.eventID == newEvent.eventID) {
                currEvent = event;
                break;
            }
        }

        const currentGroupID = window.location.href.split('=')[1].split("/")[0];
        const response = await fetch("http://localhost:5000/group/");
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
        const records = await response.json();
        var currentGroup = null;
        for(var record of records) {
            if(record.groupID == currentGroupID) {
                currentGroup = record;
            }
        }
        var currentEvents = currentGroup.events;
        currentEvents.push(currEvent._id);
        var value = {events : currentEvents};
        const toReturn = {...currentGroup,...value};
        
        console.log(toReturn);

        await fetch(`http://localhost:5000/group/update/${toReturn._id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toReturn),         
            
        });
    }

    callbackFunction = (i,eventName,eventLocation, eventDescription, start, end, weekday) => {
        //TODO make event in BD with thse info and send to DB
        // console.log(i)
        // console.log(name)
        // console.log(location)
        // console.log(description)
        // console.log(start)
        // console.log(end)
        const d = new Date();
        console.log(d.getTime())
        if(eventName === null)
        {
          alert("Please eneter a name")
        }
        else if(eventLocation === null)
        {
          alert("Please eneter a location")
        }
        else if(eventDescription === null)
        {
          alert("Please eneter a description")
        }
        else if(end === null)
        {
          alert("Please eneter a end time")
        }

        var dates = getDates();

        var eventDate = dates[weekday].split('/');


        eventDate.push(start)
        eventDate.push(end)
        eventDate.push(i)


        var toReturn = {
            name: eventName,
            attending:[],
            time:eventDate,
            location: eventLocation,
            description: eventDescription,
            eventID: this.generateGroupID(12),
        };
        this.uploadToDatabase(toReturn);
    }

    render()
    {
        const max = this.state.allGroups.reduce((a, b) => Math.max(a, b), -Infinity);
        return(
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
                        <Grid key={index} {...{ xs: 12/7}} minHeight={50} style={{backgroundColor: "rgba(255, 0, 0, "+ this.state.allGroups[index] * (100/max) +"%)"}} >
                            {
                             <EventTimeSlot
                             numEvents = {this.state.allGroups[index]}
                             value = {index}
                             heatMap = {this.state.allGroups}
                             createEvent = {this.callbackFunction}
                             maxPeople = {max}
                             />
                             
                            }
                            

                        </Grid>
                    
                    ))}


                </Grid>
            </Grid>   
        </Grid>
        )
    }

}

export default Calender;
