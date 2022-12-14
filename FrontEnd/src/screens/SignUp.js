import React, { useState } from "react";
import { useNavigate } from "react-router";

import '../styles/LogIn.css';

const SignUpScreen = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        password2: "",
      });
      const navigate = useNavigate();
  
      function updateForm(value) {
          return setForm((prev) => {
            return { ...prev, ...value };
          });
        }
  
      async function onSubmit(e) {
      e.preventDefault();

      // username blank string prevention
      if(form.username == "") {
        alert("Please input a username. — DontBeFake");
        return;
      }

      //password blank string prevention
      if(form.password == "") {
        alert("Please input a password. — DontBeFake");
        return;
      }
      const check = await fetch(`http://localhost:5000/login`);
    
      if (!check.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
      }
      const usernamechecker = await check.json();

      // no duplicate login
      for(var login of usernamechecker) {
        if(login.username == form.username) {
            alert("This username has been taken. — DontBeFake");
            return;
        }
      }
      
      var sha1 = require('sha1');
      var p1 = sha1(form.password);
      var p2 = sha1(form.password2);
      if(p1 !== p2) {
        // TODO: make it clear they fucked up
        window.location.reload(false);
        return;
      }
      const newPerson = {username : form.username, password: p1};
      
      await fetch("http://localhost:5000/login/add", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
      })
      .catch(error => {
          window.alert(error);
          return;
      });

      // creates an empty profile so the database doesn't implode on itself.
      const newProfileInformation = 
      {
        username: form.username, 
        name: "",
        profilePicture: 0,
        userDescription: "",
        joinedGroups: new Array(),
      }
      await fetch("http://localhost:5000/profile/add", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(newProfileInformation),
      })
      .catch(error => {
          window.alert(error);
          return;
      });

      const response = await fetch(`http://localhost:5000/profile/`);
    
      if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
      }
      const records = await response.json();

      var dataBase_id = -1;
      for(var record of records) {
        if(record.username === form.username) {
            dataBase_id = record._id;
        }
    }

      localStorage.setItem("DBF_username", form.username);
      localStorage.setItem("name","");
      localStorage.setItem("profilePicture", 0);
      localStorage.setItem("userDescription", "");
      localStorage.setItem("_id", dataBase_id);
      

      setForm({ username: "", password: "", password2: ""});

      navigate("/editprofile"); //TODO: change to editprofile
      window.location.reload(); // this is so navbar fixes itself
      }

    return (
        <body>
        <div>
            <div className="background">.</div>
            <div className="title">DontBeFake.
                <div className="login-text">Signup.</div>
            </div>
            <form  onSubmit={onSubmit}>
                <input
                 className= "input-bar" 
                 type="text" 
                 id="username" 
                 name="username" 
                 placeholder="Username." 
                 value={form.username}
                 onChange={(e) => updateForm({ username: e.target.value })}
                 />
                <div>
                    <input
                     className= "input-bar" 
                     type="password" 
                     id="password" 
                     name="password" 
                     placeholder="Password."
                     value={form.password}
                     onChange={(e) => updateForm({ password: e.target.value })}
                     />
                </div>
                <div>
                    <input 
                    className= "input-bar" 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="ReEnterPassword."
                    value={form.password2}
                    onChange={(e) => updateForm({ password2: e.target.value })}
                    />
                </div>
                <input className="button" type="submit" value="Submit."></input>
            </form>

        </div>
        </body>
    )
}

export default SignUpScreen;