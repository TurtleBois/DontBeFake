# DontBeFake
DontBeFake, Computer Science 35L: Software Construction Laboratory, Fall 2022, Universal of California Los Angeles

# Documentation:
Make sure you have Node installed.

For developers: don't delete the package.json files, they are important for installing correctly.
Make sure to install the following dependences in the FrontEnd folder: 
```
npm install react-bootstrap bootstrap
npm install mongodb express cors dotenv
npm install bootstrap react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install sha1
npm install --save multer
```

To host the website locally, go into the /src/ file and run:
```
npm start
```

To connect the project to the database, go into /server/ and run:
```
node server.js
```
# Frequent Problems:
```
Error: error:0308010C:digital envelope routines::unsupported
```
This means your node version is too recent, try:
```
export NODE_OPTIONS=--openssl-legacy-provider (linux)
$env:NODE_OPTIONS = "--openssl-legacy-provider" (windows powershell) 
```
Cannot connect to MongoDB: 

If you're on mac, then try turning off AirPlay, it uses the same port as our database
If that doesn't work try changing internet. For some reason, UCLA-WIFI decides not work.



