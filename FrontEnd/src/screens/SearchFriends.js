import React from "react";
import "../styles/SearchFriends.css";
import User from "../components/Users";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const SearchFriendsScreen = () => {
    var numOfUsers = 12;
    var userAlign = "right";
    return (
        <div>
            <input 
            className= "search-bar" 
            type="search" 
            id="search" 
            name="search" 
            placeholder="SearchForFriends."></input>
            
            <Box mt={2} mb={6} ml={10} mr={2}> 
                
                <Grid container columns={12} rowSpacing={6}>
                    {Array.from(Array(numOfUsers)).map((_, index) => {
                        {/* Sets alignment for friend at index. */}
                        if (index % 2 === 0) {
                            userAlign = "right" 
                            return (
                            <Grid item sm={6} key={index} align={userAlign} style={{ maxWidth: '100%'}}>
                                <User/>
                            </Grid> 
                            ) 
                        } else {
                            userAlign = "center" 
                            return (
                            <Grid item sm={6} key={index} align={userAlign} style={{ maxWidth: '100%'}}>
                                <User/>
                            </Grid> 
                            ) 
                        } 
                    })}
                </Grid>
            </Box>
        </div>
    )
}

export default SearchFriendsScreen;