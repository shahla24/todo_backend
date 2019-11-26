const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyparser = require("body-parser");



const app = express();
app.use(cors());
app.use (bodyparser.json());


app.get("/tasks", function (request, response) {
  
  response.status(200).send({
tasks: [
{id: 0001, taskDescription: "Distribution of catalogue", completed: true, dateCreated:"2019-11-25"},
{id: 0002, taskDescription: "Collection of catalogue", completed: true, dateCreated:"2019-11-23"},
{id: 0003, taskDescription: "Update and submit order", completed: true, dateCreated:"2019-11-20"},
{id: 0002, taskDescription: "Prepare individual order", completed: true, dateCreated:"2019-11-10"},
{id: 0002, taskDescription: "Pay the invoice", completed: true, dateCreated:"2019-11-08"},
{id: 0002, taskDescription: "Check calender dates", completed: true, dateCreated:"2019-11-05"},

]
  });
});

app.post("/tasks", function (request, response) {
  // Do the logic for saving the new task in the DB
  const task = request.body;
  // { text: "do the dishes", completed: true, date: "2019" }
  response.status(201).send("Successfully created task: " + task.text);
});

app.delete("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;
  response.status(200).send("Received request to delete task with id " + taskId);
});

app.put("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;
  const updatedTask = request.body;
  response.status(200).send("Updated task with id " + taskId + "with" + task.text + task.completed);
});



module.exports.tasks = serverlessHttp(app);