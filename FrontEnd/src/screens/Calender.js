
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Slot from "../utility/timeSlot";

function timeSide(index)
{
    if(9 + index === 12) 
    {
        return "12:00pm"
    }
    if (9 + index > 12)
    {
        return index - 3 + ":00pm"
    }
    return index + 9 + ":00am"
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
              height: 13}}>
            </Grid>
            {Array.from(Array(14)).map((_, index) => (
                    <Grid key={index} {...{}} minHeight={50.5}>
                        {timeSide(index)}
                    </Grid>
            ))}
    </Grid>)
}

function gridOfTimes()
{
    return<Grid
    container
    spacing={1}
    direction="column"

    maxHeight={700}
    sx={{
    '--Grid-borderWidth': '1px',
    borderTop: 'var(--Grid-borderWidth) solid',
    borderLeft: 'var(--Grid-borderWidth) solid',
    borderColor: 'white',
    '& > div': {
        borderRight: 'var(--Grid-borderWidth) solid',
        borderBottom: 'var(--Grid-borderWidth) solid',
        borderColor: 'white',
    },
    }}>
        
        {Array.from(Array(91)).map((_, index) => (
            <Grid key={index} {...{ xs: 12/7}} minHeight={50}  style={{backgroundColor: (index <4) ? 'red' : 'blue'} }  >
                <Slot/>
            </Grid>

        ))}



    </Grid>
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
          coloring: Array(91).fill('black'),
          

        };
      }
      
      handleClick(i){
        const coloring = this.state.coloring.slice();
        coloring[i] = 'red'
        this.setState({coloring: coloring,})
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

                    maxHeight={700}
                    sx={{
                    '--Grid-borderWidth': '1px',
                    borderTop: 'var(--Grid-borderWidth) solid',
                    borderLeft: 'var(--Grid-borderWidth) solid',
                    borderColor: 'white',
                    '& > div': {
                        borderRight: 'var(--Grid-borderWidth) solid',
                        borderBottom: 'var(--Grid-borderWidth) solid',
                        borderColor: 'white',
                    },
                    }}>
                        
                        {Array.from(Array(91)).map((_, index) => (
                            
                            <Grid key={index} {...{ xs: 12/7}} minHeight={50} style={{backgroundColor: this.state.coloring[index]} } >
                                <Slot onClick={() => this.handleClick(index)}/>
                            </Grid>

                        ))}



                    </Grid>
        
                </Grid>
                
            </Grid>
          );
    }
}

export default Calender;
