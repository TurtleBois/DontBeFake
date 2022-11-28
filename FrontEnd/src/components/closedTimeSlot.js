import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';


import Box from '@mui/material/Box';


class Slot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  triggerDelete = () => {
    this.props.delete(this.props.value);

  }

  handleClick = (event) => 
  {
    this.setState({anchorEl: event.currentTarget})
  }
  handleClose = () => 
  {
    this.setState({anchorEl: null})
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
                height: 40}}
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

          <Typography sx={{  p: 2}} >
            
            
          <Box sx={{ minWidth: 120}}>
            {this.props.name}
            </Box>
          
            {/* {console.log(this.props.delete)}  */}
            <Button variant="outlined"  onClick = {() => {this.props.delete(this.props.value); this.handleClose(); }} color  = {"error"} >Delete</Button>
          
            
          </Typography>
        
        </Popover>

        </Card>

        );
  }
}



export default Slot 





