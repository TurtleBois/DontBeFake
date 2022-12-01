import '../styles/Events.css';
import React from "react";


const Event = (props) => {
    return (
        <div className="content-container">
            <div className="event-content">
                <div id="box" className="box-date">
                <p>
                    {props.day} <br />{props.month}
                </p>
                </div>
                <div className="content-box">
                    <p>
                        <div id="content" className="title-font">
                            {props.eventName}
                        </div>
                        <div id="content" className="text">
                            Person 1, Person 2, Person 3
                        </div>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Event;