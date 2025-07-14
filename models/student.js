// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   fullName: String,
//   regNo: String,
//   email: String,
//   courseCode: String,
//   trainerName: String,
//   whatsappNumber: String,
//   date: String,
//   file: String,
//   branch: String
// });

// module.exports = mongoose.model('Student', studentSchema);
  









// const express = require('express');
// const router = express.Router();
// // const Student = require('../models/student');

// const Student = require('./student');

// // GET all students or by regNo
// router.get('/students/:regNo', async (req, res) => {
//   try {
//     const student = await Student.findOne({ regNo: req.params.regNo });
//     res.json(student);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching student' });
//   }
// });

// // ✅ GET distinct branches
// router.get('/branches', async (req, res) => {
//   try {
//     const branches = await Student.distinct("branch");
//     const formatted = branches.map((b) => ({
//       value: b.toLowerCase(),
//       label: b.charAt(0).toUpperCase() + b.slice(1)
//     }));
//     res.json(formatted);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch branches" });
//   }
// });

// module.exports = router; 













// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   fullName: String,
//   regNo: String,
//   email: String,
//   whatsappNumber: String,
//   branch: String,
//   courseCode: String,
//   trainerName: String,
//   date: String,
//   file: String
// });

// module.exports = mongoose.model('Student', studentSchema);













// backend/models/student.js
// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   fullName: String,
//   regNo: { type: String, unique: true },
//   email: String,
//   whatsappNumber: String,
//   branch: String,
//   courseCode: String,
//   trainerName: String,
//   date: String,
//   filePath: String // to store uploaded file name
// });

// module.exports = mongoose.model('Student', studentSchema);













// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   fullName: String,
//   regNo: String,
//   email: String,
//   whatsappNumber: String,
//   branch: String,
//   courseCode: String,
//   trainerName: String,
//   date: String,
//   file: {
//     data: Buffer,
//     contentType: String,
//     originalName: String
//   }
// });

// module.exports = mongoose.model('Student', studentSchema);




// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   fullName: String,
//   regNo: { type: String, unique: true },
//   email: String,
//   whatsappNumber: String,
//   branch: String,
//   courseCode: String,
//   trainerName: String,
//   date: String,
//   file: String ,// image filename
//   filePath: '',
// });

// module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: String,
  regNo: { type: String, unique: true },
  email: String,
  whatsappNumber: String,
  branch: String,
  courseCode: String,
  trainerName: String,
  date: String,
  file: String, // image filename
  certificateNumber: String,
  filePath: { type: String }
  
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
