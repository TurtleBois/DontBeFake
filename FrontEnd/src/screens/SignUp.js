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
      
    
      var sha1 = require('sha1');
      var p1 = sha1(form.password);
      var p2 = sha1(form.password2);
      if(p1 != p2) {
        // TODO: make it clear they fucked up
        window.location.reload(false);
        return;
      }
      const newPerson = {username : form.username, password: p1};
      
      await fetch("http://localhost:5000/profile/add", {
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
      setForm({ username: "", password: "", password2: ""});
      navigate("/profile");
      }

    return (
        <body>
        <div>
            <div className="background">.</div>
            <div className="title">DontBeFake.
                <div className="login-text">Login.</div>
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