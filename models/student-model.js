const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentId: Number,
  firstName: String,
  lastName: String,
  age: Number,
  dob: String,
  department: String
});

const StudentModel = mongoose.model("Student", studentSchema);

module.exports = StudentModel;