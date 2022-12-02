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
            <div className="App"  style={{backgroundColor: '#121212'}}>
                <h1>DontBeFake.</h1>
                <NavbarComp/>
            </div>
        )
    }
}

export default App;