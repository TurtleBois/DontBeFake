import React from "react";
import Friend from "../components/GroupDisplay";
import FindMoreFriends from "../components/FindMoreFriends";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import '../styles/group.css';



// these do something i think
var friendAlign = "right";
var fmfAlign = "center";

async function getGroup() {
    var DBF_username = localStorage.getItem("DBF_username");
        if(DBF_username == null) {
            // this should NEVER happen
            DBF_username = "chang";
        }
        const response = await fetch(`http://localhost:5000/profile/`);
    
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const records = await response.json();
        for(var record of records) {
            if(record.username === DBF_username) {
                return record.joinedGroups;
            }
        }
        return null;


}


class viewGroup extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            numOfMembers: 0,
            groups: null,
        }
        this.init();
    }

    async init() {
        var record = await getGroup();
        if(record == null) {
        }
        console.log(record)
        this.setState({
            numOfMembers: record.length,
            groups: record
            },
            () => {
                this.render();
            });
    }
    
    
    render() {
        
        return (
            
            

            <div>


                <Box mt={6} mb={6} ml={3} mr={3}   > 
                    <Grid container columns={24} rowSpacing={3} columnSpacing = {3} >
                        {Array.from(Array(this.state.numOfMembers)).map((_, index) => {
                            return (
                                <Grid item sm={6} key={index} style={{ maxWidth: '100%'}}>
                                    <Friend 
                                    name = {this.state.groups[index]}
     
                                    />
                                </Grid> 
                            )  
                        })}
                    </Grid>
                </Box>
            </div>
        )   
    }


}
export default viewGroup;


// import React from "react";
// import "../styles/Error.css"

// const Error = () => {
//     return(
//         <b><h4>Error.</h4></b>
//     )
// }

// export default Error;