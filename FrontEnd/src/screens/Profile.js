import React, { useState, useEffect, Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";



const ProfileScreen = () => {
    return (
        <div>
            <h2>Profile</h2>
            
            <Col className="profileContainer"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Row style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>this is where the profile pic will go</Row>
            </Col>
            <Row style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>name</Row>
        </div>
    )
}

export default ProfileScreen;
