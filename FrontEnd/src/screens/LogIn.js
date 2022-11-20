import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import '../styles/LogIn.css';

const LoginScreen = () => {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    var sha1 = require('sha1');


    // creates temp form
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    // updates form 
    function updateForm(value) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
    }


    async function onLogin(e) {
        e.preventDefault();
        var username = form.username
        var password = sha1(form.password)
        for(var record of records) {
            if(username === record["username"]) {
               if(password === record["password"]) {
                    navigate("/profile")
               }
               else {
                // TODO:
                // invalid password
               }
            }
            else {
                // TODO:
                // invalid username
            }
        }
    }


 
    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
          const response = await fetch(`http://localhost:5000/profile/`);
      
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
      
          const records = await response.json();
          setRecords(records);
        }
        // this immediately gets them
        getRecords();
        return;
      }, [records.length]);

    return (
        <body>
        <div>
            <div className="background">.</div>
            <div className="title">DontBeFake.
                <div className="login-text">Login.</div>
            </div>
            <form onSubmit={onLogin}>
                <input 
                className= "input-bar" 
                type="text" id="username" 
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
                <input className="button" type="submit" value="Login."></input>
            </form>
            <div>
            <a href="./SignUp">or SignUp.</a>
            </div>
        </div>
        </body>
        
    )
}

export default LoginScreen;