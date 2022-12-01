import React, {useState, useEffect} from "react";
import "../styles/SearchFriends.css";
import User from "../components/Users";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GroupReq from "../components/GroupReq";

async function initGroups() {
    const response = await fetch("http://localhost:5000/group/");
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const records = await response.json();

    var recordToArray = [];
    for(var record of records) {
        recordToArray.push(record);
    }

    return recordToArray;

}

var initDone = false;
const allGroups = initGroups().then( () => {initDone = true;});


const SearchGroupScreen = () => {
    var userAlign = "right";


    const [form, setForm] = useState({
        value: ""
    });

    function updateForm(value) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
    }
    const [allGroups, setAllGroups] = useState(null);
    //effectively an init
    useEffect(() => {
        async function getAllGroups() {
            const response = await fetch("http://localhost:5000/group/");
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
              }
              const records = await response.json();
          
              var recordToArray = [];
              for(var record of records) {
                  recordToArray.push(record);
              }
          
              setAllGroups(recordToArray);
        }
        getAllGroups();
     }, [])

    
    var filteredGroups = [];
    function filter() {
        var delimeter = "";
        if(document.getElementById("search") == null ) {
            delimeter = ""
        }
        else {
            delimeter = document.getElementById("search").value;
        }
        var filtered = [];
        for(var group of allGroups) {
            if(group["groupName"].startsWith(delimeter)) {
                filtered.push(group);
            }
        }
        // console.log(filtered); 
        return filtered;
    }

   //exists because allGroups need to wait till the nexr cycle to be ready
   if(allGroups == null) {
    return;
   }
   filteredGroups = filter();
    return (
        <body>
            <form className="search-form">
                <input 
                autocomplete="off"
                className= "search-bar" 
                type="input" 
                id="search" 
                name="search" 
                value={form.value}
                onChange={(e) => updateForm({ value: e.target.value })}
                placeholder="SearchForGroups.">
                </input>
            </form>
            
            <Box mt={2} mb={6} ml={10} mr={10}> 
                <Grid container columns={12} rowSpacing={6}>
                    {Array.from(Array(filteredGroups.length)).map((_, index) => {
                        {/* Sets alignment for friend at index. */}
                        if (index % 2 === 0) {
                            userAlign = "right" 
                            return (
                            <Grid item sm={6} key={index} align={userAlign} style={{ maxWidth: '100%'}}>
                                <GroupReq 
                                name={filteredGroups[index]["groupName"]}
                                numMembers={filteredGroups[index]["members"].length}
                                id={filteredGroups[index]["groupID"]}
                                _id={filteredGroups[index]["_id"]}
                                />
                            </Grid> 
                            ) 
                        } else {
                            userAlign = "center" 
                            return (
                            <Grid item sm={6} key={index} align={userAlign} style={{ maxWidth: '100%'}}>
                                <GroupReq 
                                name={filteredGroups[index]["groupName"]}
                                numMembers={filteredGroups[index]["members"].length}
                                id={filteredGroups[index]["groupID"]}
                                _id={filteredGroups[index]["_id"]}
                                />  
                            </Grid> 
                            ) 
                        } 
                    })}
                </Grid>
            </Box>
        </body>
    )
}




export default SearchGroupScreen;