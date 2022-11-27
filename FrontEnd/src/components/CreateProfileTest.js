import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router";

import '../styles/CreateProfileTest.css';
import default_pfp from "../assets/default_pfp.png"     


const CreateProfileTest = () => {
    var current_pfp = default_pfp;

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


    
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    // creates Profile

    const [form, setForm] = useState({
        name: "",
        profilePicture: "",
        userDescription: "",
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


     var toReturn = {name: form.name, userDescription: form.userDescription, profilePicture: form.profilePicture};
     console.log(toReturn);
      
      
      await fetch("http://localhost:5000/profile/add", {
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
      //setForm({ username: "", password: "", password2: ""});
      


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
            <form onSubmit={onSubmit} enctype="multipart/form-data">
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