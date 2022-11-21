
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Slot from "../utility/timeSlot";



import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';




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








class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          monday: Array(14).fill(null),
          tuesday: Array(14).fill(null),
          wendsday: Array(14).fill(null),
          thursday: Array(14).fill(null),
          friday: Array(14).fill(null),
          saturday: Array(14).fill(null),
          sunday: Array(14).fill(null),
          coloring: Array(189).fill('rgba(90, 52, 52, 0)'),
          eventNames: new Array(),
          startTimes: new Array(),
          endTimes: new Array(),
          numEvents: 0,
          alert: false,

        };
      }

      changeColor(i){
        const coloring = this.state.coloring.slice();
        coloring[i] = 'red'
        this.setState({coloring: coloring,})
      }

      callbackFunction = (i,name, start, end) => {
        const weekday = Math.floor(i/27);

        const eventNames = this.state.eventNames.slice();
        const startTimes = this.state.startTimes.slice();
        const endTimes = this.state.endTimes.slice();

        eventNames.push(name)
        startTimes.push(start)
        endTimes.push(end)


        for(let j = start ; j < end; j++) {
            if(this.state.coloring[(27*weekday)+j] != 'rgba(90, 52, 52, 0)')
            {
                alert("You have a overlapping event — DontBeFake");
                return
            }
        }  
        for(let j = start ; j < end; j++) {
            this.state.coloring[(27*weekday)+j] = 'red'
        }  


        this.setState({eventNames: eventNames,})
        this.setState({startTimes: startTimes,})
        this.setState({endTimes: endTimes,})

        

        console.log("i:"+ i)
        console.log("start:"+ this.state.startTimes)
        console.log("end:"+ this.state.endTimes)
        // this.setState({eventNames: this.state.eventNames.push(name)})
        // this.setState({startTimes: this.state.eventNames.push(start)})
        // this.setState({endTimes: this.state.eventNames.push(end)})
      }

      

      
      

      renderSlot(i) {
        return(
        <Grid key={i} {...{ xs: 12/7}} minHeight={50} style={{backgroundColor: this.state.coloring[i]} } >
            <Slot  parentCallback = {this.callbackFunction} value = {i}/>
        </Grid>);
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
