// Task 5 — Employee schema with validation
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name:         { type: String, required: [true, 'Employee name is required'] },
  email:        { type: String, required: [true, 'Email is required'], unique: true },
  password:     { type: String, required: [true, 'Password is required'] },           // hashed
  department:   { type: String, required: [true, 'Department is required'] },
  designation:  { type: String, default: '' },
  role:         { type: String, enum: ['employee', 'manager', 'hr'], default: 'employee' },
  leaveBalance: { type: Number, default: 20, min: [0, 'Leave balance cannot be negative'] }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
