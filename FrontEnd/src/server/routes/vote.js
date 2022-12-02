const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

 
// get a list of all the profiles
recordRoutes.route("/vote").get(function (req, res) {
 let db_connect = dbo.getDb("profiles");
 db_connect
   .collection("votes")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
//get a login by an ID
recordRoutes.route("/vote/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("events")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new login.
recordRoutes.route("/vote/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
    groupID: req.body.groupID,
    eventID: req.body.eventID,
    electionID: req.body.electionID,
    voters: req.body.voters,
    beFakeCandidates: req.body.beFakeCandidates,  
 };
 db_connect.collection("votes").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/vote/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    groupID: req.body.groupID,
    eventID: req.body.eventID,
    electionID: req.body.electionID,
    voters: req.body.voters,
    beFakeCandidates: req.body.beFakeCandidates,  
   },
 };
 db_connect
   .collection("votes")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("votes").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;