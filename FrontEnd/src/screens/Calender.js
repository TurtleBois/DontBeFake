
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Slot from "../utility/timeSlot";

export default function FullBorderedGrid() {
  return (
      
      <Grid
        container
        spacing={1}
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >


        

        {Array.from(Array(91)).map((_, index) => (
            <Grid key={index} {...{ xs: 12/7}} minHeight={50}>
                <Slot/>
            </Grid>
        ))}


      </Grid>
  );
}

// const Calender = () => {
//     return (

        
//         <h2>Calender goes here</h2>
//     )
// }

// export default Calender;