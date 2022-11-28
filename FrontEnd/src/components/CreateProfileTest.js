import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router";

import '../styles/CreateProfileTest.css';
import default_pfp from "../assets/default_pfp.png"     


var please_call_once = false;
const CreateProfileTest = () => {
    console.log(current_pfp);
    var current_pfp = default_pfp;
    if(localStorage.getItem("profilePicture") != "") { // why the fuck is it an empty string here but not anywhere else???
        current_pfp = localStorage.getItem("profilePicture");
    }
    var temp = ""
    function set_pfp(event) {
        var file = event.target.files[0];
        if(file.length == 0) {
            return
        }
        var new_url = URL.createObjectURL(file);
        var preview = document.getElementById("display_pfp");
        preview.src = new_url;
        handlePhoto(event);
    }
    const navigate = useNavigate();
    // creates form

    console.log(localStorage);
    const [form, setForm] = useState({  
        username: localStorage.getItem("DBF_username"), 
        name: localStorage.getItem("name") == "undefined" ? "" : localStorage.getItem("name"),
        profilePicture: localStorage.getItem("profilePicture") == "undefined" ? "" : localStorage.getItem("profilePicture"),
        userDescription: localStorage.getItem("userDescription") == "undefined" ? "" : localStorage.getItem("userDescription"),
    });

    // updates form 
    function updateForm(value) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
        
    }
    
    const handlePhoto = (e) => {
      function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var value = {profilePicture : reader.result};
            updateForm(value);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }
      getBase64(e.target.files[0]);
    }
    
    async function onSubmit(e) {  
      e.preventDefault();
      var toReturn = {
        username: form.username, 
        name: form.name, 
        userDescription: form.userDescription, 
        profilePicture: form.profilePicture,
    };
        var data_id = localStorage.getItem("mongoDB_ID");

        const response = await fetch(`http://localhost:5000/profile/`);
    
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const records = await response.json();
        var data_id = -1;
        for(var record of records) {
            if(record.username === localStorage.getItem("DBF_username")) { 
                data_id = record._id;
                break;
            }
        }



        console.log(data_id);
        await fetch(`http://localhost:5000/profile/update/${data_id}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(toReturn),
        })
        .catch(error => {
            window.alert("error");
            window.alert("ok error");
            return;
        });

        localStorage.setItem("name", toReturn.name);
        localStorage.setItem("profilePicture", toReturn.profilePicture);
        localStorage.setItem("userDescription", toReturn.userDescription);
  
        navigate("/profile");
        window.location.reload(); // this is so navbar fixes itself
      } 

      
    return (
        <div>
            <img 
            class="rounded-circle"
            id="display_pfp"
            src={current_pfp} 
            alt="My_Logo"
            img width="300" 
            height="300" 
            />
            <form 
            onSubmit={onSubmit} 
            enctype="multipart/form-data">
                <label class="custom-file-upload">
                    <input 
                    type="file"     
                    id="change_pfp"
                    name="avatar"
                    accept="image/*"
                    onChange={(event) =>set_pfp(event)} 
                    /> 
                    Change Profile Picture
                </label>
                <div>
                    <input 
                    className= "input-bar" 
                    id ="nameInput"
                    type="text" 
                    name="realName" 
                    placeholder="Name."
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div>
                    <input 
                    className= "input-bar" 
                    type="text" 
                    id="description" 
                    name="description" 
                    placeholder="EnterBio. (Max 150)."
                    value={form.userDescription}
                    onChange={(e) => updateForm({ userDescription: e.target.value })}
                    />
                </div>
                <input 
                  className="button" 
                  type="submit" 
                  value="Update." 
                />
                
            </form>
        </div>
    )
}

export default CreateProfileTest;