import React, { Component } from "react";
import '../styles/LogIn.css';
import blackMargin from '../assets/black-margin.png';

export default class LogIn extends Component {
    render() {
        return (
            <div
            style={{
                background: '#121212',
            }}>
                {/* <img 
                className="login-title"
                src= {blackMargin}
                /> */}
                <div className="background">.</div>
                <div className="title">DontBeFake.
                    <div className="login-text">LogIn.</div>
                </div>
                <form>
                    <label htmlFor="username">Username.</label>
                    <input className= "input" type="text" id="username" name="username"></input>
                    <label htmlFor="password">Password.</label>
                    <input className= "input" type="text" id="password" name="password"></input>
                </form>
            </div>
        )
    }
}