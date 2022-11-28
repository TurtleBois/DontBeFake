
import Card from "../components/card";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';




export default function ResponsiveGrid() {
  return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(1)).map((_, index) => (
                <Grid item xs={3}  key={index}>
                    <Card/>
                </Grid>
            ))}
        </Grid>

  );
}



class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          numSched : 1
        };
      }


}