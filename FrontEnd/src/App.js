import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp.js';
import React from "react";
import './styles/LogIn.css';

function App() {
    if (window.location.href === "http://localhost:3000/login") {
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

export default App;