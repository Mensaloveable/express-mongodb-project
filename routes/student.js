var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var studentModel = require("../models/student-model");

router.get("/", (req, res, next) => {
  res.send("response from student route");
});

router.post("/add", function (req, res, next) {
  let newStudent = new studentModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    dob: req.body.dob,
    department: req.body.department,
  });

  newStudent
    .save()
    .then((newStudent) => {
      res.send({
        status: 200,
        message: "Student added successfully",
        studentObject: newStudent,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/list", (req, res, next) => {
  studentModel
    .find()
    .then((response) => {
      res.send({
        status: 200,
        students: response,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/byFirstName", (req, res, next) => {
  const firstNameQuery = req.query.firstName;
  studentModel
    .find({ firstName: firstNameQuery })
    .then((student) => {
      res.send({
        status: 200,
        student: student,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/updateFirstName", async (req, res, next) => {
  try {
    const oldFirstName = req.query.oldFirstName;
    const newFirstName = req.query.newFirstName;

    const updatedStudent = await studentModel.findOneAndUpdate(
      { firstName: oldFirstName }, // Find the document with oldFirstName
      { firstName: newFirstName }, // Set the new value for firstName
      { new: true } // Return the updated document in the response
    );

    if (!updatedStudent) {
      return res.status(404).send({
        status: "error",
        message: "Student not found.",
      });
    }

    res.status(200).send({
      status: "success",
      student: updatedStudent,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while updating the student.",
      error: err.message,
    });
  }
});

// router.delete("/deleteStudent", (req, res, next) => {
//   const filter = { firstName: req.query.firstName };
//   studentModel
//     .deleteOne(filter)
//     .then((response) => {
//       res.send({
//         status: 200,
//         deleted: true,
//       });
//     })
//     .catch((err) => {
//       res.status(err.status).send({
//         status: err.status,
//         message: err.message,
//       });
//     });
// });

router.delete("/deleteStudent", async (req, res, next) => {
  try {
    const filter = { firstName: req.query.firstName };
    const deleteResult = await studentModel.deleteOne(filter);

    console.log({res: "res"},deleteResult);

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({
        status: 404,
        message: "Student not found.",
        deleted: false,
      });
    }

    res.status(200).send({
      status: 200,
      deleted: true,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "An error occurred while deleting the student.",
      error: err.message,
    });
  }
});


module.exports = router;
