import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';






function timeScale(index)
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class Slot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      end: null,
      anchorEl: null,
    };
  }
  handleClick = (event) => 
  {
    this.setState({anchorEl: event.currentTarget})
  }
  handleClose = () => 
  {
    this.setState({anchorEl: null})
  }

  handleChangeName = (event) => 
  {
    this.setState({name: event.target.value})
  }
   handleChangeEnd = (event) => 
  {
    this.setState({end: event.target.value})
  }

  createGroupEvent = () => 
  {

      const weekday = Math.floor(this.props.value/27);


      const start = this.props.value%27;
      console.log(weekday);
      console.log(start);
      console.log(this.state.end);

      for(let j = start ; j < this.state.end; j++) {
        if(this.props.heatMap[(27*weekday)+j] !== 0){
            alert("You have a overlapping event — DontBeFake");
            return
        }
      }  

      

  }


  render()
  {
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popover' : undefined;
      if(this.props.numEvents !== 0)
      {
        return;
      }
      return(
        <Card variant="outlined"
        style={{backgroundColor: 'rgba(90, 52, 52, 0)', border: "none", boxShadow: "none"} }>

          <CardActionArea
              variant="contained" aria-describedby={id}  onClick={this.handleClick} sx={{
                height: 40}}
                disableRipple
                >
              
          </CardActionArea>

          <Popover
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          >

        <Typography sx={{ p: 2 }}>
        
          <TextField
              required
              id="outlined-required"
              label="Event Name"
              value={this.state.name}
              onChange={this.handleChangeName}
            />
          
          <Box sx={{ minWidth: 120}}>
            Start: {timeScale(Math.floor(this.props.value%27)) }
          </Box>

          <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">end</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.end}
                  label="end"
                  onChange={this.handleChangeEnd}
                  MenuProps={MenuProps}
                >
                  {Array.from(Array(27 - this.props.value%27)).map((_, index) => (
                          <MenuItem value={index+ this.props.value%27 + 1}>{timeScale(index + this.props.value%27 + 1)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <Button variant="outlined"  onClick = {() => {this.handleClose(); this.createGroupEvent()}} >confirm</Button>

        
        </Typography>
        
        </Popover>

        </Card>

        );
  }
}

export default Slot;



