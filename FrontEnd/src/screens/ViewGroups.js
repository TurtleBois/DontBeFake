import React from "react";
import GroupDisplay from "../components/GroupDisplay";
import FindMoreGroups from "../components/findMoreGroups";
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
        var joinedGroups = [];
        for(var record of records) {
            if(record.username === DBF_username) {
                joinedGroups = record.joinedGroups;
                break;
            }
        }
        const groupResponse = await fetch(`http://localhost:5000/group/`);
        if (!groupResponse.ok) {
            const message = `An error occurred: ${groupResponse.statusText}`;
            window.alert(message);
            return;
        }
        const groups = await groupResponse.json();
        var groupNamesAndIDs = [];
        for(var group of groups) {
            for(var joinedGroup of joinedGroups) {
                if(group["groupID"] == joinedGroup) {
                    var bundle = {id: joinedGroup, name: group["groupName"]};
                    groupNamesAndIDs.push(bundle);
                    break;
                }
            }
        }
        return groupNamesAndIDs;
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
                <b><h3>MyGroups.</h3></b>
                <Box mt={1} mb={2} ml={5} mr={5}> 
                    <Grid container columns={24} rowSpacing={3} columnSpacing={3}>
                        {Array.from(Array(this.state.numOfMembers)).map((_, index) => {
                            return (
                                <Grid item sm={6} key={index} style={{ maxWidth: '100%'}}>
                                    <GroupDisplay 
                                    info = {this.state.groups[index]}
                                    />
                                </Grid> 
                            )  
                        })}
                    {/* Makes Grid item for Add Group*/}
                    <Grid item sm={6} style={{maxWidth: '100%'}}>
                        <FindMoreGroups/>
                    </Grid>
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