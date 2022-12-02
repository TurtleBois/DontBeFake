import React, {useState, useEffect} from "react";
import '../styles/Events.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const EventDetails = (props) => {
    const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const descriptionElementRef = React.useRef(null);
  const [attending, setAttending] = useState(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    async function getUserGroups() {
      const attending1 = props.attending;
      var attendeeNames = "";
      for(var attendee of attending1) {
        const response = await fetch(`http://localhost:5000/profile/${attendee}`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
      }
      const profile = await response.json();
        if(profile.name != "") {
          if(attendeeNames != "") {
            attendeeNames+= ", ";
          }
          attendeeNames+=(profile.name);
        }
      }
      
      setAttending(attendeeNames);
    }
    getUserGroups();
  }, [open]);

    var start = new Date(props.beginTime);
    start.setTime(props.beginTime);



    var end = new Date(props.endTime);
    end.setTime(props.endTime);
    if(attending == null) {
      return;
    }
    
    
    function toStandardTime(hours, min)
    {
        var stdHours = hours; 
        var pm = false; 
        if(hours > 12)
        {
            stdHours -=12;
            pm = true;
        }
        if(stdHours === 0)
        {
            stdHours = 12
        }

        if(pm)
        {
            return(stdHours +  ":" + ("0" + min).slice(-2) + "pm") 
        }
        else{
            return(stdHours +  ":" + ("0" + min).slice(-2) + "am") 
        }
        
    }

    return(
        <div>
            <div id="box" className="box-date" onClick={handleClickOpen('paper')}>
                <p>
                    {props.day} <br />{props.month}
                </p>
            </div>
            <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"> {props.name}</DialogTitle>

        <DialogContent dividers={scroll === 'paper'}>

          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >

            Where: {props.location}
            <br></br>
            When: {props.month} {props.day} | {toStandardTime(start.getHours(), start.getMinutes())} - {toStandardTime(end.getHours(), end.getMinutes())}
            <br></br>
            Who: {attending}

            <DialogContent dividers={scroll === 'paper'}>

            {props.description}


            </DialogContent>

            ID: {props.id}

          </DialogContentText>



        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
       


      </Dialog>




        </div>
    )
}

export default EventDetails;