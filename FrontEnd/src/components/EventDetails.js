import React from "react";
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
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

    console.log(props)
    var start = new Date(props.beginTime);
    start.setTime(props.beginTime);



    var end = new Date(props.endTime);
    end.setTime(props.endTime);

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
            When: {props.month} {props.day} | {("0" + start.getHours()).slice(-2) + ":" + ("0" + start.getMinutes()).slice(-2) + ":" + ("0" + start.getSeconds()).slice(-2)} - {("0" + end.getHours()).slice(-2) + ":" +("0" + end.getMinutes()).slice(-2) + ":" + ("0" + start.getSeconds()).slice(-2)   } 
            

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