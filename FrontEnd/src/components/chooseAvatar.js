import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Stack from '@mui/material/Stack';

import face_default from "../assets/face_default.png";
import face_happy from "../assets/face_happy.png";
import face_ditto from "../assets/face_ditto.png";
import face_angry from "../assets/face_angry.png";
import face_winky from "../assets/face_winky.png";
import face_XD from "../assets/face_XD.png";
const pfps = [face_default,face_happy,face_ditto,face_angry,face_winky,face_XD];

const DialogSelect = (props) => {
  const [open, setOpen] = React.useState(false);
  const [picId, setPicId] = React.useState(0);
  
const sendData = () => {
    props.parentCallback(picId);
  }

  const handleChange0 = (event) => {
    setPicId(0);
  };
  const handleChange1 = (event) => {
    setPicId(1);
  };
  const handleChange2 = (event) => {
    setPicId(2);
  };
  const handleChange3 = (event) => {
    setPicId(3);
  };
  const handleChange4 = (event) => {
    setPicId(4);
  };
  const handleChange5 = (event) => {
    setPicId(5);
  };



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>ChangeProfilePicture.</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle style={{backgroundColor: '#302c2c', color: 'white',}}>ChooseAnAvatar.</DialogTitle>
        <DialogContent style={{backgroundColor: '#302c2c'}}>
            <div>
                <Stack direction="row" spacing={2}>
                    {/* {Array.from(Array(6)).map((_, index) => (        
                            <button onClick= {handleChange} value = {index} style={{borderRadius: '4px', objectFit: 'cover'}}><img style={{width: '100%', height:'100%', borderRadius:'4px', objectFit: 'cover'}} src={pfps[index]}/></button>
                    ))} */}
                    <button onClick= {handleChange0} style={{borderRadius: '4px', objectFit: 'cover'}}><img style={{width: '100%', height:'100%', borderRadius:'4px', objectFit: 'cover'}} src={pfps[0]}/></button>
                    <button onClick= {handleChange1} style={{borderRadius: '4px', objectFit: 'cover'}}><img style={{width: '100%', height:'100%', borderRadius:'4px', objectFit: 'cover'}} src={pfps[1]}/></button>
                    <button onClick= {handleChange2} style={{borderRadius: '4px', objectFit: 'cover'}}><img style={{width: '100%', height:'100%', borderRadius:'4px', objectFit: 'cover'}} src={pfps[2]}/></button>
                    <button onClick= {handleChange3} style={{borderRadius: '4px', objectFit: 'cover'}}><img style={{width: '100%', height:'100%', borderRadius:'4px', objectFit: 'cover'}} src={pfps[3]}/></button>
                    <button onClick= {handleChange4} style={{borderRadius: '4px', objectFit: 'cover'}}><img style={{width: '100%', height:'100%', borderRadius:'4px', objectFit: 'cover'}} src={pfps[4]}/></button>
                    <button onClick= {handleChange5} style={{borderRadius: '4px', objectFit: 'cover'}}><img style={{width: '100%', height:'100%', borderRadius:'4px', objectFit: 'cover'}} src={pfps[5]}/></button>

                </Stack>
            </div>

        </DialogContent>
        <DialogActions style={{backgroundColor: '#302c2c'}}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={ () => {handleClose(); sendData();}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogSelect