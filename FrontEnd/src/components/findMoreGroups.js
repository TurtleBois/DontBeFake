
import "../styles/GridDisplay.css"
import "../styles/FindMoreGroups.css"

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
                vertical: 27,
                horizontal: 30,
                }}
            >
                <Typography>
                    <button className="button-out"><a className="button-style" href="/searchgroups">SearchGroups.</a></button>
                    <br /><button className="button-out"><a className="button-style" href="/joingroup">JoinOrCreateGroup.</a></button>
                </Typography>
            </Popover>
        </body>
    )
}

export default FindMoreGroups;