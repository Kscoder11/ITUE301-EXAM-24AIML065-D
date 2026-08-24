// Task 3 + 5 — Leave routes: apply, view own, approve/reject
const express = require('express');
const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../models/Employee');

const router = express.Router();

// POST /api/v1/leaves — apply for leave (protected)
// Task 5: validates days <= leaveBalance, deducts on creation
router.post('/', async (req, res, next) => {
  try {
    const { leaveTypeId, fromDate, toDate, days, reason } = req.body;

    // Fetch employee to check balance
    const employee = await Employee.findById(req.employee.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Task 5: balance validation
    if (days > employee.leaveBalance) {
      return res.status(400).json({
        success: false,
        message: `Insufficient leave balance. Available: ${employee.leaveBalance}, Requested: ${days}`
      });
    }

    // Create leave request
    const leave = await LeaveRequest.create({
      employeeId: req.employee.id,
      leaveTypeId,
      fromDate,
      toDate,
      days,
      reason
    });

    // Deduct balance
    await Employee.findByIdAndUpdate(req.employee.id, { $inc: { leaveBalance: -days } });

    res.status(201).json({ success: true, data: leave });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/leaves/my — return employee's own requests (protected)
// Task 5: uses .populate() for leaveTypeId
router.get('/my', async (req, res, next) => {
  try {
    const leaves = await LeaveRequest.find({ employeeId: req.employee.id })
      .populate('leaveTypeId', 'name maxDaysPerYear')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: leaves });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/leaves/:id/status — manager approves/rejects (protected)
// Task 3: validates status against allowed list
const ALLOWED_STATUSES = ['approved', 'rejected'];

router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${ALLOWED_STATUSES.join(', ')}`
      });
    }

    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!leave) {
      return res.status(404).json({ success: false, message: 'Leave request not found' });
    }

    // If rejected, refund the days back to employee balance
    if (status === 'rejected') {
      await Employee.findByIdAndUpdate(leave.employeeId, { $inc: { leaveBalance: leave.days } });
    }

    res.status(200).json({ success: true, data: leave });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
