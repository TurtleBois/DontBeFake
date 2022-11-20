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






export default function Slot(props) {
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





