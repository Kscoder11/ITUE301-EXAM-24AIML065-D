// Task 5 — LeaveType schema with enum validation
const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Leave type name is required'],
    enum: {
      values: ['Casual', 'Sick', 'Earned', 'CompOff'],
      message: '{VALUE} is not a valid leave type'
    }
  },
  maxDaysPerYear: { type: Number, required: [true, 'maxDaysPerYear is required'] }
}, { timestamps: true });

module.exports = mongoose.model('LeaveType', leaveTypeSchema);
