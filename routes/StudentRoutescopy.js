// // student.routes.js
// const express = require('express');
// const router = express.Router();
// const upload = require('../uploads/middleware/upload');
// const Student = require('../models/student');
// const Course = require('../models/course');







// // 🔍 Universal Search route
// router.get('/search', async (req, res) => {
//   const query = req.query.q;

//   try {
//     const student = await Student.findOne({
//       $or: [
//         { regNo: { $regex: query, $options: 'i' } },
//         { fullName: { $regex: query, $options: 'i' } },
//         { certificateNumber: { $regex: query, $options: 'i' } },
//         { whatsappNumber: { $regex: query, $options: 'i' } }
//       ]
//     });

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const modifiedStudent = {
//       ...student._doc,
//       filePath: student.file
//     };

//     res.json(modifiedStudent);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });





















// // CREATE or UPDATE student based on regNo
// router.post('/', upload.single('file'), async (req, res) => {
//   try {
//     const existingStudent = await Student.findOne({ regNo: req.body.regNo });

//     const studentData = {
//       ...req.body,
//       file: req.file ? req.file.filename : req.body.file || null
//     };

//     const student = existingStudent
//       ? await Student.findOneAndUpdate({ regNo: req.body.regNo }, studentData, { new: true })
//       : await new Student(studentData).save();

//     const message = existingStudent ? 'Student updated successfully' : 'Student created successfully';
//     res.json({ message, data: student });
//   } catch (err) {
//     console.error('❌ Error in POST /students:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET student by Reg No
// router.get('/:regNo', async (req, res) => {
//   try {
//     const student = await Student.findOne({ regNo: req.params.regNo });
//     if (!student) return res.status(404).json({ message: 'Student not found' });

//     const modifiedStudent = {
//       ...student._doc,
//       filePath: student.file
//     };

//     res.json(modifiedStudent);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // UPDATE student by Reg No
// router.put('/:regNo', upload.single('file'), async (req, res) => {
//   try {
//     const updateData = {
//       ...req.body,
//       file: req.file ? req.file.filename : undefined
//     };

//     const updatedStudent = await Student.findOneAndUpdate(
//       { regNo: req.params.regNo },
//       updateData,
//       { new: true }
//     );

//     if (!updatedStudent) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     res.json({ message: 'Student updated successfully', data: updatedStudent });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE student
// router.delete('/:regNo', async (req, res) => {
//   try {
//     const deletedStudent = await Student.findOneAndDelete({ regNo: req.params.regNo });
//     if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
//     res.json({ message: 'Student deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




// // Autocomplete Course Suggestions
// router.get('/courses/search', async (req, res) => {
//   const query = req.query.q || '';
//   try {
//     const suggestions = await Course.find({
//       name: { $regex: '^' + query, $options: 'i' }
//     })
//       .limit(5)
//       .select('name -_id');

//     const uniqueCourses = [...new Set(suggestions.map((item) => item.name))];
//     res.json(uniqueCourses);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching suggestions' });
//   }
// });

// // Check if RegNo exists
// router.get('/check-regno/:regNo', async (req, res) => {
//   try {
//     const student = await Student.findOne({ regNo: req.params.regNo });
//     res.json({ exists: !!student });
//   } catch (err) {
//     console.error('❌ Error in /check-regno:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;


















const express = require('express');
const router = express.Router();
const upload = require('../uploads/middleware/upload');
const Student = require('../models/student1');
const Course = require('../models/course');

// CREATE or UPDATE student based on regNo
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const existingStudent = await Student.findOne({ regNo: req.body.regNo });

    if (existingStudent) {
      const updateData = { ...req.body };
      if (req.file) {
        updateData.file = req.file.filename;
      }

      const updatedStudent = await Student.findOneAndUpdate(
        { regNo: req.body.regNo },
        updateData,
        { new: true }
      );

      return res.json({ message: 'Student updated successfully', data: updatedStudent });
    } else {
      const newStudent = new Student({
        ...req.body,
        file: req.file ? req.file.filename : null
      });

      await newStudent.save();
      return res.json({ message: 'Student created successfully', data: newStudent });
    }
  } catch (err) {
    console.error('❌ Error in POST /students:', err);
    res.status(500).json({ error: err.message });
  }
});




// Universal Search
// router.get('/search', async (req, res) => {
//   const q = req.query.q;

//   try {
//     const student = await Student.findOne({
//       $or: [
//         { regNo: { $regex: q, $options: 'i' } },
//         { fullName: { $regex: q, $options: 'i' } },
//         { certificateNumber: { $regex: q, $options: 'i' } }
        
//       ]
//     });

//     if (!student) return res.status(404).json({ message: "Student not found" });

//     const modifiedStudent = {
//       ...student._doc,
//       filePath: student.file
//     };

//     res.json(modifiedStudent);
//   } catch (err) {
//     console.error("❌ Error in /search route:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });









// Universal Search
// router.get('/search', async (req, res) => {
//   const q = req.query.q;

//   try {
//     const student = await Student.findOne({
//       $or: [
//         { regNo: { $regex: q, $options: 'i' } },
//         { fullName: { $regex: q, $options: 'i' } },
//         { certificateNumber: { $regex: q, $options: 'i' } },
//         { whatsappNumber: { $regex: q, $options: 'i' } }  // 🔥 New line added
//       ]
//     });

//     if (!student) return res.status(404).json({ message: "Student not found" });

//     const modifiedStudent = {
//       ...student._doc,
//       filePath: student.file
//     };

//     res.json(modifiedStudent);
//   } catch (err) {
//     console.error("❌ Error in /search route:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// 🔍 Universal Search route
// router.get('/search', async (req, res) => {
//   const query = req.query.q;

//   try {
//     const student = await Student.findOne({
//       $or: [
//         { regNo: { $regex: query, $options: 'i' } },
//         { fullName: { $regex: query, $options: 'i' } },
//         { certificateNumber: { $regex: query, $options: 'i' } },
//         { whatsappNumber: { $regex: query, $options: 'i' } }
//       ]
//     });

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // ✅ Add this part to include image filename in response
//     const modifiedStudent = {
//       ...student._doc,
//       filePath: student.file // 👈 this helps frontend set preview image
//     };

//     res.json(modifiedStudent);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// 🔍 Universal Search route
router.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    const student = await Student.findOne({
      $or: [
        { regNo: { $regex: query, $options: "i" } },
        { fullName: { $regex: query, $options: "i" } },
        { certificateNumber: { $regex: query, $options: "i" } },
      ],
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ Add filePath before sending
    const modifiedStudent = {
      ...student._doc,
      filePath: `/uploads/${student.file}`,
    };

    res.json(modifiedStudent);
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ message: "Server error" });
  }
});









// GET by Reg No
router.get('/:regNo', async (req, res) => {
  try {
    const student = await Student.findOne({ regNo: req.params.regNo });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const modifiedStudent = {
      ...student._doc,
      filePath: student.file // for image rendering
    };

    res.json(modifiedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE student by Reg No
router.put('/:regNo', upload.single('file'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.file = req.file.filename;
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { regNo: req.params.regNo },
      updateData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', data: updatedStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
router.delete('/:regNo', async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ regNo: req.params.regNo });

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Autocomplete Course Suggestions
router.get('/courses/search', async (req, res) => {
  const query = req.query.q || '';
  try {
    const suggestions = await Course.find({
      name: { $regex: '^' + query, $options: 'i' }
    }).limit(5).select('name -_id');

    const uniqueCourses = [...new Set(suggestions.map(item => item.name))];

    res.json(uniqueCourses);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching suggestions' });
  }
});

// Check if RegNo exists

router.get("/check-regno/:regNo", async (req, res) => {
  try {
    const student = await Student.findOne({ regNo: req.params.regNo });
    res.json({ exists: !!student }); // returns true or false
  } catch (err) {
    console.error("❌ Error in /check-regno:", err);
    res.status(500).json({ error: "Server error" });
  }
});




module.exports = router;
