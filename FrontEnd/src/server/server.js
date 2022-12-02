const express = require("express");

const app = express();

// literally a fix for file limit
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(require("./routes/profile"));
app.use(require("./routes/login"));
app.use(require("./routes/schedule"));
app.use(require("./routes/group"));
app.use(require("./routes/event"));
app.use(require("./routes/vote"));
app.use(require("./routes/trial"));
// get driver connection
const dbo = require("./db/conn");


app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});