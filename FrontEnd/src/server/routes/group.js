const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// get a list of all the groups
recordRoutes.route("/group").get(function (req, res) {
 let db_connect = dbo.getDb("groups");
 db_connect
   .collection("groups")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
//get a group by an ID
recordRoutes.route("/group/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("groups")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new group.
recordRoutes.route("/group/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
    groupName: req.body.groupName,
    groupID: req.body.groupID,
    members: req.body.members, 
    events: req.body.events,
 };
 
 db_connect.collection("groups").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a group by id.
recordRoutes.route("/group/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    groupName: req.body.groupName,
    groupID: req.body.groupID,
    members: req.body.members, 
    events: req.body.events,
   },
 };
 db_connect
   .collection("groups")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you group a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("groups").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;