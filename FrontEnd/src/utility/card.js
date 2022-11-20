// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import * as React from 'react';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import calenderIcon from './caleIcon.jpg'

  


  export default function BasicCard() {
    return (
      <Card>
      <CardActionArea
        href="/calen" variant="contained">
        <CardMedia
          component="img"
          height="210"
          image= {calenderIcon}
          alt="Calender"
        />
        <CardContent>
        </CardContent>
      </CardActionArea>
    </Card>


      
    );
  }