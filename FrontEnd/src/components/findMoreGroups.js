
import "../styles/GridDisplay.css"

import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const FindMoreGroups = () => {
const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


    return(
        <body class="groupDisplay">
            <div class="groupDisplay-text">
                <a ><b><p id="groupDisplay-name">AddGroup.</p></b></a>
                <a class="groupDisplay-link" onClick={handleClick}><img alt="group-img" src={require('../assets/plus-sign.png')}/></a>
            </div>
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
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
        </body>
    )
}

export default FindMoreGroups;