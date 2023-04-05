# DontBeFake
DontBeFake, is a MERN-stack web-app for schedule planning, with a little added spice. One can create a group or join existing ones

# Documentation:
Make sure you have Node installed. 

For developers:
```
npm install react-bootstrap bootstrap
npm install mongodb express cors dotenv
npm install bootstrap react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install sha1
```

For quick-installation:
Make sure you have the latest version of node installed and are using Visual Studio Code as hosting platform.
To host the website locally, navigate through DontBeFake/FrontEnd and type in the terminal:
```
npm install
```
This will create a node-modules package that houses many dependencies used in the program. 
Next, we must start the "BackEnd" part of our server.
Create a new terminal and navigate to DontBeFake/FrontEnd/src/server and run the following terminal command:
```
node server.js
```
Successful startup should look like:
```
Server is running on port: 5000
Successfully connected to MongoDB.
```


To host the website on a local web-browser, go back to the original terminal and run:
```
npm start
```
You are now all set to run DontBeFake! To start, head over to the login page by clicking on the top-right avatar. 


# Frequent Problems:
```
Error: error:0308010C:digital envelope routines::unsupported
```
This means your node version is too recent, within the terminal type:
```
export NODE_OPTIONS=--openssl-legacy-provider (linux)
$env:NODE_OPTIONS = "--openssl-legacy-provider" (windows powershell) 
```
Cannot connect to MongoDB: 
If you're on mac, then try turning off AirPlay, it uses the same port as our database.
If that doesn't work try changing internet. For some reason, UCLA-WIFI does not work with our program. 



