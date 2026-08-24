// Task 3 — LeaveTypes route: GET /api/v1/leave-types (public)
const express = require('express');
const LeaveType = require('../models/LeaveType');

const router = express.Router();

// GET /api/v1/leave-types — return all leave types
router.get('/', async (req, res, next) => {
  try {
    const types = await LeaveType.find();
    res.status(200).json({ success: true, data: types });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
