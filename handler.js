const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const uuidv4 = require('uuid/v4');


const app = express();
app.use(cors());
app.use (bodyParser.json());


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user:process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  database: "mytodolist"
});



app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM task", function(err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).send({
        tasks: data
      });
    }
  });

});

// app.post("/tasks", function (request, response) {
 
//   connection.query('INSERT INTO tasks SET ?', {id: "0001", taskDescription: "Distribution of catalogue", completed: "true", dateCreated: "2019-11-05", userId: "1"}, function (error, results, fields) {
//     if (err) { 
//     console.log("Error posting tasks", err);
//     response.status(500).json({
//       error: err
//     });
//   } else {
//     response.json({
//       tasks: fields
//     })
//   }
// })
// });


// app.post("/tasks", function (request, response) {
//   // create new task in the database
//   const task = request.body;
//   // {values needed: taskId, taskDescription,  completed, dateCreated, userId}
//   const q = "INSERT INTO task (taskId, taskDescription, dateCreated, completed, userId) VALUES (?, ?, ?, ?,?)";
//   connection.query(q, [task.taskId, task.taskDescription, task.dateCreated, task.completed, task.userId], function (err, data) {
//     if (err) {
//       response.status(500).json({error: err});
//     } else {
//       response.sendStatus(201);
//     }
//   })
// })

// app.post("/tasks", function(request, response){
//   //Create a new task
//   const task = request.body;
//   const q = "INSERT tasks SET taskId = ?, taskDescription = ?, completed = ?, dateCreated = ?, userId = ? ";
//   connection.query(q, [task.taskId, task.taskDescription, task.completed, task.dateCreated, task.userId ], function (err, data){
//     if(err){
//       response.status(500).json({error: err});
//     }else{
//       response.status(201).send("Created a new task with text: "+task.taskText);
//     }
//   })
// });

app.post("/tasks", function (request, response) {
  const taskId = request.params.taskId;
  const task = {
    taskId: uuidv4(),
    taskDescription: request.body.taskDescription,
    completed: request.body.completed,
    dateCreated: request.body.dateCreated,
    userId: request.body.userId,
  }
  connection.query("INSERT INTO task SET ? ", task, function (err, data) {
    if (err) {
      console.log("Error inserting task", err);
      response.status(500).json({
        error: err
      });
    } else {
      console.log("Created task with id " + taskId);
      response.status(201).send({
        tasks: data
      });
    }
  });
});



// app.delete("/tasks/:taskId", function (request, response) {
//   connection.query("DELETE FROM task WHERE id = '0001'", function(err, result, fields) {
//     if (err) {
//       console.log("Error deleting tasks", err);
//       response.status(500).json({
//         error: err
//       });
//     } else {
//       response.json({
//         tasks: result
//       })
//     }
//   })
//   });

  app.delete("/tasks/:id", function (request, response) {
    const taskId = request.params.taskId;
    connection.query("DELETE FROM task WHERE taskId = ?", [taskId], function (err,data){
      if (err) {
        console.log("Error deleting task with taskId", err);
        response.status(500).json({
          error: err
        });
      } else {
        console.log("Deleted task with Id "+ taskId)
        response.status(200).send({
          tasks: data
        });
      }
    });
  });






app.put("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;
  const updatedTask = request.body;
  response.status(200).send("Updated task with id " + taskId + "with" + task.text + task.completed);
});



module.exports.tasks = serverlessHttp(app);