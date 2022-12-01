import Events from '../styles/Events.css';
import React from "react";
import greyBox from '../assets/greyBox.png';
import { padding } from '@mui/system';

const EventsScreen = () => {

    return(
        <div>
            <div>
                <a className="button-text" href= "../events"> UpcomingEvents. </a>
                <a className="button-text" href= "../pastevents"> PastEvents. </a>
            </div>
            {/* event */}
            <div className="content-container">
                <div className="event-content">
                    <div id="box" className="box-date">
                    <p>
                        30 <br />NOV
                    </p>
                    </div>
                    <div className="content-box">
                        <p>
                            <div id="content" className="title-font">
                                EventName.
                            </div>
                            <div id="content" className="text">
                                Person 1, Person 2, Person 3
                            </div>
                        </p>
                    </div>
                </div>
                {/* event */}
                <div className="event-content" style={{paddingLeft: 100}}>
                    <div id="box" className="box-date">
                    <p style={{justifyContent: 'center', alignContent: 'center'}}>
                        01 <br />DEC
                    </p>
                    </div>
                    <div className="content-box">
                        <p>
                            <div id="content" className="title-font">
                                EventName.
                            </div>
                            <div id="content" className="text">
                                Person 1, Person 2, Person 3
                            </div>
                        </p>
                    </div>
                </div>
            </div>

            {/* event */}
            <div className="content-container">
                <div className="event-content">
                    <div id="box" className="box-date">
                    <p>
                        02 <br />DEC
                    </p>
                    </div>
                    <div className="content-box">
                        <p>
                            <div id="content" className="title-font">
                                EventName.
                            </div>
                            <div id="content" className="text">
                                Person 1, Person 2, Person 3
                            </div>
                        </p>
                    </div>
                </div>
                {/* event */}
                <div className="event-content" style={{paddingLeft: 100}}>
                    <div id="box" className="box-date">
                    <p style={{justifyContent: 'center', alignContent: 'center'}}>
                        03 <br />DEC
                    </p>
                    </div>
                    <div className="content-box">
                        <p>
                            <div id="content" className="title-font">
                                EventName.
                            </div>
                            <div id="content" className="text">
                                Person 1, Person 2, Person 3
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsScreen;
