// import React, { Component } from "react";

// // export default class About extends Component {
// //     render() {
// //         return (
// //             <div>
// //                 <h2> TODO add box that can hover and cloick to go to indual schedules</h2>
// //             </div>
// //         )
// //     }
// // }

import Card from "../utility/card";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';




export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}  justifyContent="center"
    alignItems="center">
      <Grid 
        container
        aligit megnItems="center" 
        spacing={10}
        style={{ minHeight: '100vh' }}
        >
            <Grid item xs={12} sm={6} md={4} >
                <Card />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card />
            </Grid>
        </Grid>
    </Box>
  );
}
// class Schedule extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           squares: Array(9).fill(null),
//         };
//       }


// }