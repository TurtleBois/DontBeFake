import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import calenderIcon from './caleIcon.jpg'



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


class Slot extends React.Component {


  

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      start: null,
      end: null,
      anchorEl: null,

    };
  }

  sendData = () => {
    this.props.parentCallback(this.state.name,this.state.start,this.state.end);
  }

  handleClick = (event) => 
  {
    this.setState({anchorEl: event.currentTarget})
  }
  handleClose = (event) => 
  {
    this.setState({anchorEl: null})
  }
  handleChangeStart = (event) => 
  {
    this.setState({start: event.target.value})
  }
  handleChangeEnd = (event) => 
  {
    this.setState({end: event.target.value})
  }
  handleChangeName = (event) => 
  {
    this.setState({name: event.target.value})
  }


  render()
  {
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
      <Card variant="outlined"
      style={{backgroundColor: 'rgba(90, 52, 52, 0)'} }>

        <CardActionArea
            variant="contained" aria-describedby={id}  onClick={this.handleClick} sx={{
              height: 40}}>
            
        </CardActionArea>

        <Popover
        id={id}
        open={open}
        anchorEl={this.state.anchorEl}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        >

        <Typography sx={{ p: 4 }}>
          
          
        <TextField
          required
          id="outlined-required"
          label="Event Name"
          onChange={this.handleChangeName}
        />
        


        <Box sx={{ minWidth: 120}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">start</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.start}
                label="start"
                onChange={this.handleChangeStart}
              >

                {Array.from(Array(14)).map((_, index) => (
                        <MenuItem value={index}>{timeScale(index)}</MenuItem>
                ))}

                
              </Select>
            </FormControl>
          </Box>
         

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">end</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.end}
                label="end"
                onChange={this.handleChangeEnd}
              >
                {Array.from(Array(14)).map((_, index) => (
                        <MenuItem value={index}>{timeScale(index)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
         

          <Button variant="outlined"  onClick = {() => {this.sendData(); this.props.onClick()}}>confirm</Button>
        
        
        </Typography>
      
      </Popover>

    </Card>

    );
  }

}


export default Slot 



/*
function Slotc(props) {
  

  //for the pop up
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;




  //for the select time
  const [start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');
  const [name, setName] = React.useState('');

  const handleChangeStart = (event) => {
    setStart(event.target.value);
  };

  const handleChangeEnd = (event) => {
    setEnd(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  
  
  



    return (
      <Card variant="outlined"
      style={{backgroundColor: 'rgba(90, 52, 52, 0)'} }>

        <CardActionArea
            variant="contained" aria-describedby={id}  onClick={handleClick} sx={{
              height: 40}}>
            
        </CardActionArea>

        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        >

        <Typography sx={{ p: 4 }}>
          
          
        <TextField
          required
          id="outlined-required"
          label="Event Name"
          onChange={handleChangeName}
        />
        


        <Box sx={{ minWidth: 120}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">start</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={start}
                label="start"
                onChange={handleChangeStart}
              >

                {Array.from(Array(14)).map((_, index) => (
                        <MenuItem value={index}>{timeScale(index)}</MenuItem>
                ))}

                
              </Select>
            </FormControl>
          </Box>
         

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">end</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={end}
                label="end"
                onChange={handleChangeEnd}
              >
                {Array.from(Array(14)).map((_, index) => (
                        <MenuItem value={index}>{timeScale(index)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
         

          <Button variant="outlined"   onClick={props.onClick}>confirm</Button>
        
        
        </Typography>
      
      </Popover>

    </Card>

    );
  }


*/


