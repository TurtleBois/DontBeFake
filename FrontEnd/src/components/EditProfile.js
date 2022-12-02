import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router";

import '../styles/EditProfile.css';
import default_pfp from "../assets/default_pfp.png";
import ChooseAvatar from "../components/chooseAvatar.js";  

import face_default from "../assets/face_default.png";
import face_happy from "../assets/face_happy.png";
import face_ditto from "../assets/face_ditto.png";
import face_angry from "../assets/face_angry.png";
import face_winky from "../assets/face_winky.png";
import face_XD from "../assets/face_XD.png";
const pfps = [face_default,face_happy,face_ditto,face_angry,face_winky,face_XD];


const EditProfile = () => {
    
    var current_pfp = default_pfp;
    if(localStorage.getItem("profilePicture") != "") { // why the fuck is it an empty string here but not anywhere else???
        current_pfp = pfps[localStorage.getItem("profilePicture")];
    }
    var temp = ""
    // function set_pfp(event) {
    //     var file = event.target.files[0];
    //     if(file.length == 0) {
    //         return
    //     }
    //     var new_url = URL.createObjectURL(file);
    //     var preview = document.getElementById("display_pfp");
    //     preview.src = new_url;
    //     // handlePhoto(event);
    // }
    const [pic, setPic] = useState(null);

    var callbackFunction = (picId) =>{
        console.log(picId);
        updateForm({ profilePicture: picId });
        setPic(picId);
    }

    const navigate = useNavigate();
    // creates form

    const [form, setForm] = useState(null);

    useEffect(() => {
        async function getUserGroups() {
        var DBF_username = localStorage.getItem("DBF_username");
        if(DBF_username == null) {
            // this should NEVER happen
            DBF_username = "chang";
        }
        const response = await fetch(`http://localhost:5000/profile`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const record = await response.json();
        var toReturnForm = [];
        for(var profile of record) {
            if(profile.username == DBF_username) {
                toReturnForm = 
                {
                    username: DBF_username,
                    name: profile.name,
                    profilePicture: profile.profilePicture,
                    userDescription: profile.userDescription,
                    joinedGroups: profile.joinedGroups,
                }
                break;
            } 
        }
        console.log(toReturnForm);
        
        setForm(toReturnForm);
        }
        getUserGroups();

     }, [])



    
    // updates form 
    function updateForm(value) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
        
    }
    
    // const handlePhoto = (e) => {
    //   function getBase64(file) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //         var value = {profilePicture : reader.result};
    //         updateForm(value);
    //     };
    //     reader.onerror = function (error) {
    //       console.log('Error: ', error);
    //     };
    //  }
    //   getBase64(e.target.files[0]);
    // }
    
    async function onSubmit(e) {  
      e.preventDefault();
      var toReturn = {
        username: form.username, 
        name: form.name, 
        userDescription: form.userDescription, 
        profilePicture: form.profilePicture,
        joinedGroups: form.joinedGroups,
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
        console.log(toReturn);
        localStorage.setItem("name", toReturn.name);
        if(pic !== null)
        {
            localStorage.setItem("profilePicture", pic);
        }
        // localStorage.setItem("profilePicture", toReturn.profilePicture);
        localStorage.setItem("userDescription", toReturn.userDescription);
  
        navigate("/profile");
        window.location.reload(); // this is so navbar fixes itself
      } 


    if(form == null) {
        return;
    }


    return (
        <div>
            <img 
            class="rounded-circle"
            id="display_pfp"
            src={current_pfp} 
            alt="My_Logo"
            img width="250" 
            height="250" 
            />
            <form 
            onSubmit={onSubmit} 
            enctype="multipart/form-data">
                <label class="custom-file-upload">
                    {/* <input 
                    type="file"     
                    id="change_pfp"
                    name="avatar"
                    accept="image/*"
                    onChange={(event) =>set_pfp(event)} 
                    />  */}
                    <ChooseAvatar 
                    parentCallback = {callbackFunction}
                    />
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

export default EditProfile;