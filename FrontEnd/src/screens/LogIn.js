import React, { Component } from "react";
import '../styles/LogIn.css';

const LoginScreen = () => {
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