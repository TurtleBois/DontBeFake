
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Slot from "../components/timeSlot";
import ClosedSlot from "../components/closedTimeSlot";



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

// saves current "calender" into the database
async function saveInformation(state,newSchedule) {
    var DBF_username = localStorage.getItem("DBF_username");
    if(DBF_username == null) {
        // this should NEVER happen
        DBF_username = "chang";
    }
    var toReturn = {"profileID": DBF_username,"state" : state}
    // if the schedule has never existed... somethow
    if(newSchedule) {
        await fetch("http://localhost:5000/schedule/add", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(toReturn),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
    }
    else {
        // if the schedule has existed before
        var prevState = await getInformation();
        var id =  prevState._id;
        toReturn = {"returnID" : id,"profileID": DBF_username,"state" : state}
            await fetch(`http://localhost:5000/schedule/update/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toReturn),
            
   });
    }
}



class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //coloring: Array(189).fill('rgba(90, 52, 52, 0)'),
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


    callbackFunction = (i,name, start, end) => {
        console.log(this.state)
        const weekday = Math.floor(i/27);


        if(name === null || name === "")
        {
            alert("Please enter a name");
            return
        }
        if(end == null)
        {
            alert("Please enter a end time");
            return
        }
        for(let j = start ; j < end; j++) {
            if(this.state.setEvents[(27*weekday)+j] !== null)
            {
                alert("You have a overlapping event — DontBeFake");
                return
            }
        }  
        const eventNames = this.state.eventNames.slice();
        const startTimes = this.state.startTimes.slice();
        const endTimes = this.state.endTimes.slice();

        eventNames.push(name)
        startTimes.push(start)
        endTimes.push(end)

        
        
        for(let j = start ; j < end; j++) {
            //this.state.coloring[(27*weekday)+j] = "hsl(" + this.state.numEvents*15+ ", 90%, 50%)"
            this.state.setEvents[(27*weekday)+j] = this.state.numEvents
        }  

        // console.log(this.state)
        // sets  the states and then saves information into the database
        this.setState({
            eventNames: eventNames, 
            startTimes: startTimes, 
            endTimes: endTimes, 
            numEvents : this.state.numEvents +1,
            },
            () => {
                saveInformation(this.state,this.firstTime);
                this.firstTime = false
            });

        }

      

        deleteEvent = (i) => {
             
            const setEvents = this.state.setEvents.slice();
            for(let j = 0 ; j < 189; j++)
            {
                console.log(setEvents[j]);  
                console.log(i);  
                if(setEvents[j] === i)
                {
                    setEvents[j] = null
                }
            }

            this.setState({
                setEvents: setEvents
                },
                () => {
                    saveInformation(this.state,this.firstTime);
                    this.firstTime = false
            });
        }
      

        renderSlot(i) {
        
            if(this.state.setEvents[i] === null)
            {
                return(
                <Grid key={i} {...{ xs: 12/7}} minHeight={50} style={{backgroundColor: this.state.setEvents[i] === null? 'rgba(90, 52, 52, 0)': "hsl(" + this.state.setEvents[i] *15+ ", 90%, 50%)"} } >
                    <Slot  parentCallback = {this.callbackFunction} value = {i} />
                </Grid>);
            }
            else
            {
                return(
                <Grid key={i} {...{ xs: 12/7}} minHeight={50} style={{backgroundColor: this.state.setEvents[i] === null? 'rgba(90, 52, 52, 0)': "hsl(" + this.state.setEvents[i] *15+ ", 90%, 50%)"} } >
                <ClosedSlot delete = {this.deleteEvent} value = {this.state.setEvents[i]} name={this.state.eventNames[this.state.setEvents[i]]}/>
                </Grid>);
            }
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
                                this.renderSlot(index)
                            ))}
                        </Grid>
                    </Grid>   
                </Grid>
            );
    }
}

export default Calender;
