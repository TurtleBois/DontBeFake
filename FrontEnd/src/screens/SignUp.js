import React, { Component } from "react";
import '../styles/LogIn.css';

const SignUpScreen = () => {
    return (
        <body>
        <div>
            <div className="background">.</div>
            <div className="title">DontBeFake.
                <div className="login-text">Login.</div>
            </div>
            <form>
                <input className= "input-bar" type="text" id="username" name="username" placeholder="Username."></input>
                <div>
                    <input className= "input-bar" type="password" id="password" name="password" placeholder="Password."></input>
                </div>
                <div>
                    <input className= "input-bar" type="password" id="password" name="password" placeholder="ReEnterPassword."></input>
                </div>
                <input className="button" type="submit" value="Submit."></input>
            </form>

        </div>
        </body>
    )
}

export default SignUpScreen;