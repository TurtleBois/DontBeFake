
import Card from "../utility/card";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';




export default function ResponsiveGrid() {
  return (
    // <Box sx={{ flexGrow: 1 }}  justifyContent="center"
    // alignItems="center">
    //   <Grid 
    //     container
    //     aligit megnItems="center" 
    //     spacing={1}

    //     style={{ maxHeight: '100vh'} }
        
    //     justifyContent="space-around"
    //     >
    //         <Grid item xs={8} sm={6} md={4} >
    //             <Card />
    //         </Grid>
    //         <Grid item xs={8} sm={6} md={4}>
    //             <Card />
    //         </Grid>
    //         <Grid item xs={8} sm={6} md={4}>
    //             <Card />
    //         </Grid>
    //         <Grid item xs={8} sm={6} md={4}>
    //             <Card />
    //         </Grid>
    //         <Grid item xs={8} sm={6} md={4}>
    //             <Card />
    //         </Grid>
    //         <Grid item xs={8} sm={6} md={4}>
    //             <Card />
    //         </Grid>
    //         <Grid item xs={8} sm={6} md={4}>
    //             <Card />
    //         </Grid>
    //         <Grid item xs={8} sm={6} md={4}>
    //             <Card />
    //         </Grid>
    //     </Grid>
    // </Box>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(8)).map((_, index) => (
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