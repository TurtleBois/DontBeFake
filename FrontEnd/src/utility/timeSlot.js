import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import calenderIcon from './caleIcon.jpg'

  


  export default function Slot() {
    return (
      <Card variant="outlined">
        <CardActionArea
          href="/calen" variant="contained">
          <Typography gutterBottom variant="h5" component="div">
              Time
            </Typography> 
        </CardActionArea>
      </Card>


      
    );
  }