const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/studentDB', {

mongoose.connect('mongodb+srv://harthikpandiya0033:cert123@cluster0.haswais.mongodb.net/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


// Correct single route usage
// app.use('/api/students', require('./routes/StudentRoutescopy'));
app.use('/api/students', require('./routes/StudentRoutescopy'));


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
