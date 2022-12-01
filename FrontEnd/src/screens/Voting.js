import React from "react";
import "../styles/Voting.css"
import GroupMate from "../components/GroupMate";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



class VotingScreen extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            numOfGroupMates: 5,
            fake: [],
            real: [],
        }
        
    }
    render()
    {
        var groupMatesAlign = "right";
        return(
        <div>
            <Box pt={3.5} pb={3.5} ml={7} mr={7}> 
                <Grid container columns={12} rowSpacing={5}>
                    {Array.from(Array(this.state.numOfGroupMates)).map((_, index) => {
                        {/* Sets alignment for groupmate at index. */}
                        if (index % 2 === 0) {
                            groupMatesAlign = "right" 
                        } else {
                            groupMatesAlign = "center" 
                        } 
                        {/* Makes Grid item for groupmate at index. */}
                        return (
                            <Grid item sm={6} key={index} align={groupMatesAlign} style={{ maxWidth: '100%'}}>
                                <GroupMate/>
                            </Grid> 
                        )  
                    })}
                </Grid>
                <button id="vote-button"><b>Vote.</b></button>
            </Box>
        </div>
        )
    }


}




// const VotingScreen = () => {
//     var numOfGroupMates = 5;
//     var groupMatesAlign = "right";
//     return (
//         <div>
//             <Box pt={3.5} pb={3.5} ml={7} mr={7}> 
//                 <Grid container columns={12} rowSpacing={5}>
//                     {Array.from(Array(numOfGroupMates)).map((_, index) => {
//                         {/* Sets alignment for groupmate at index. */}
//                         if (index % 2 === 0) {
//                             groupMatesAlign = "right" 
//                         } else {
//                             groupMatesAlign = "center" 
//                         } 
//                         {/* Makes Grid item for groupmate at index. */}
//                         return (
//                             <Grid item sm={6} key={index} align={groupMatesAlign} style={{ maxWidth: '100%'}}>
//                                 <GroupMate/>
//                             </Grid> 
//                         )  
//                     })}
//                 </Grid>
//                 <button id="vote-button"><b>Vote.</b></button>
//             </Box>
//         </div>
//     )
// }

export default VotingScreen;