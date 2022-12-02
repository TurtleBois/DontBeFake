import React from "react";
import "../styles/GroupMate.css"

const GroupMate = (props) => {
    var name = props.name;
    const [vote, setVote] = React.useState(null);

    const handleYes = () => {
        
        console.log("he is fake")
        var first = false
        if(vote === null)
        {
            console.log("this is your first time voting fake")
            first = true
        }
        setVote(true)
        props.registerVote(props.userID, true, first)
        
      }
      
      const handleNo = () => {
        var first = false
        if(vote === null)
        {
            console.log("this is your first time voting fake")
            first = true
        }
        setVote(false)
        props.registerVote(props.userID, false, first)
      }

    if(props.name == "") {
        name = "Powell Cat"
    }
    


    // console.log(props)
    return(
        <body class="groupmate">
            <img alt="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
            <div class="groupmate-text">
                <b><p id="groupmate-name">{name}</p></b>
                <b><p id="groupmate-username">@{props.username}</p></b>
                <button class={(!vote && vote !== null) ? "pressed-buttons":"voting-buttons" } id="real-button" onClick={handleNo} ><b>Real.</b></button>
                <button class={(vote && vote !== null) ? "pressed-buttons":"voting-buttons" } id="fake-button" onClick={handleYes}><b>Fake.</b></button>
            </div>
        </body>
    )
}

export default GroupMate;