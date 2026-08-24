// Task 5 — LeaveRequest schema with refs, enums, and validation
const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee reference is required']
  },
  leaveTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeaveType',
    required: [true, 'Leave type reference is required']
  },
  fromDate: { type: Date, required: [true, 'From date is required'] },
  toDate:   { type: Date, required: [true, 'To date is required'] },
  days: {
    type: Number,
    required: [true, 'Number of days is required'],
    min: [1, 'Leave must be at least 1 day']
  },
  reason: { type: String, maxlength: [500, 'Reason cannot exceed 500 characters'] },
  status: {
    type: String,
    enum: {
      values: ['pending', 'approved', 'rejected', 'cancelled'],
      message: '{VALUE} is not a valid status'
    },
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
