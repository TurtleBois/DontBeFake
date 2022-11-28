import React from "react";
import Friend from "../components/Friends";
import FindMoreFriends from "../components/FindMoreFriends";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import '../styles/group.css';

// move to profile
async function generateGroupID(length) {
    var result = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var charLength = chars.length;
    for ( var i = 0; i < length; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    
    const response = await fetch(`http://localhost:5000/login/`);
      
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const records = await response.json();
    // prevents duplicates incase someone wins the lottery 10 times in a row

    for (var record of records) {
        if(record.groupID == result) {
            return generateGroupID(length);
        }
    }
    
    return result;
}

// these do something i think
var friendAlign = "right";
var fmfAlign = "center";
class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupID: "",
            numOfMembers: 0,
        }
        this.init();
    }

    async init() {
       var newGroupID = await generateGroupID(12);
        this.setState({
            groupID: newGroupID,
            numOfMembers: 0,
            },
            () => {
               this.render();
            });
    }
    
    render() {
        return (
            <div>
            <div className="title">UntitledGroup. </div>
                <div className="group-id">GroupID:{this.state.groupID} </div>


                <Box mt={6} mb={6} ml={10} mr={2}> 
                    <Grid container columns={12} rowSpacing={6}>
                        {Array.from(Array(this.state.numOfMembers)).map((_, index) => {
                            {/* Sets alignment for FindMoreFriends component. */}
                            if (this.state.numOfMembers % 2 === 0) {
                                fmfAlign = "right" 
                            } else {
                                fmfAlign = "center" 
                            }
                            {/* Sets alignment for friend at index. */}
                            if (index % 2 === 0) {
                                friendAlign = "right" 
                            } else {
                                friendAlign = "center" 
                            } 
                            {/* Makes Grid item for Friend at index. */}
                            return (
                                <Grid item sm={6} key={index} align={friendAlign} style={{ maxWidth: '100%'}}>
                                    <Friend/>
                                </Grid> 
                            )  
                        })}
                        {/* Makes Grid item for FindMoreFriends. */}
                        <Grid item sm={6} align={fmfAlign} style={{maxWidth: '100%'}}>
                            <FindMoreFriends/>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        )   
    }


}
export default CreateGroup;
