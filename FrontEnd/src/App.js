import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp.js';
import React from "react";
import './styles/LogIn.css';

function App() {
    if (localStorage.getItem("DBF_username") === null) {
        return (
            <div className="App">
                <NavbarComp/>
            </div>
        )
    } else {
        return (
            <div className="App">
                <h1>DontBeFake.</h1>
                <NavbarComp/>
            </div>
        )
    }
}

// window.location.href === "http://localhost:3000/login" || window.location.href === "http://localhost:3000/SignUp"
export default App;